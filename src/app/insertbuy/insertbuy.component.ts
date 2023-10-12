import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlphaomegaService } from '../alphaomega.service';
import { ModaltemporderitemComponent } from '../modaltemporderitem/modaltemporderitem.component';
import { ModalbasketComponent } from '../modalbasket/modalbasket.component';
import { ModaladdamountbuyComponent } from '../modaladdamountbuy/modaladdamountbuy.component';
import { ModalbasketbuyComponent } from '../modalbasketbuy/modalbasketbuy.component';

@Component({
  selector: 'app-insertbuy',
  templateUrl: './insertbuy.component.html',
  styleUrls: ['./insertbuy.component.scss'],
})
export class InsertbuyComponent implements OnInit {

  constructor(public navCtrl: NavController, public location: Location, public router: Router, public modalController: ModalController,
    public alertController: AlertController, public toastController: ToastController, public as: AlphaomegaService, public storage: Storage) { }
  masterBarangBuy = [];
  masterBarangBasketBuy = [];
  masterBarangBuyPagination = [];
  searchText: string = "";
  currentModal = null;
  numOfItem = 0;
  namaSupplier: string = "";
  isEdit: boolean = false;
  page: number = 1;
  max: number = 0;
  startNum: number = 0;
  endNum: number = 24;
  isSearch = false;
  masterBarangBuySearch = [];
  // amount:number = 0;
  masterBarangBuyList() {
    this.as.masterBarangList().subscribe(
      (data) => {
        this.masterBarangBuy = data;
        this.masterBarangBuy.forEach(element => {
          element['amount'] = 0;
          // if(element['amount']>0){

          // } else {
          //   element['amount'] = 0;
          // }
          element['index'] = this.masterBarangBuy.indexOf(element);
        }
        );
        // console.log(this.masterBarangBasketBuy);
        this.masterBarangBasketBuy.forEach(element => {
          this.masterBarangBuy.forEach(element2 => {
            if (element['index'] == element2['index']) {
              element2['amount'] = element['amount'];
            }
          });
        });
        this.masterBarangBuyPagination = this.masterBarangBuyPagination.concat(this.masterBarangBuy.slice(this.startNum, this.endNum));
        this.masterBarangBuyPagination.forEach(element => {
          if (element['amount'] > 0) {

          } else {
            element['amount'] = 0;
          }
          element['index'] = this.masterBarangBuyPagination.indexOf(element);
        }
        );
        this.startNum = this.endNum;
        if (this.endNum + 24 > this.masterBarangBuy.length) {
          this.endNum = this.masterBarangBuy.length;
        } else {
          this.endNum = this.endNum + 24;
        }
        this.max = Math.ceil(this.masterBarangBuy.length / 25);

        // console.log(this.max);
        // if(event){
        //   event.target.complete();
        // }
        // console.log(this.masterBarangBuyPagination);
      }
    );
  }
  masterBarangBuyList2(event?) {
    this.as.masterBarangList().subscribe(
      (data) => {
        // this.masterBarangBuy = data;
        // this.masterBarangBuy.forEach(element => {
        //   if(element['amount']>0){

        //   } else {
        //     element['amount'] = 0;
        //   }
        //   element['index'] = this.masterBarangBuy.indexOf(element);
        // }
        // );
        // console.log(this.startNum);
        // console.log(this.endNum);
        this.masterBarangBuyPagination = this.masterBarangBuyPagination.concat(this.masterBarangBuy.slice(this.startNum, this.endNum));
        // generate for loop
        for (let i = this.startNum; i < this.endNum; i++) {
          // console.log ("Block statement execution no." + i);
          this.masterBarangBuyPagination[i]['index'] = this.masterBarangBuyPagination.indexOf(this.masterBarangBuyPagination[i]);
          this.masterBarangBuyPagination[i]['amount'] = this.masterBarangBuy[i]['amount'];
        }

        // this.masterBarangBuyPagination.forEach(element => {
        //   if(element['amount']>0){

        //   } else {
        //     element['amount'] = 0;
        //   }
        //   element['index'] = this.masterBarangBuyPagination.indexOf(element);
        // }
        // );
        this.startNum = this.endNum;
        if (this.endNum + 24 > this.masterBarangBuy.length) {
          this.endNum = this.masterBarangBuy.length;
        } else {
          this.endNum = this.endNum + 24;
        }
        this.max = Math.ceil(this.masterBarangBuy.length / 25);

        // console.log(this.max);
        if (event) {
          event.target.complete();
        }
        // console.log(this.masterBarangBuyPagination);
        // console.log(this.masterBarangBuy);
      }
    );
  }
  loadProductMore(event) {
    this.page++;
    this.masterBarangBuyList2(event);
    if (this.page == this.max) {
      event.target.disabled = true;
    }
  }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  searchFunction() {
    // console.log(this.searchText);
    // console.log($event);
    this.isSearch = true;
    this.as.searchMasterBarang(this.searchText).subscribe(
      (data) => {
        this.masterBarangBuySearch = data;
        this.masterBarangBuy.forEach(element => {
          this.masterBarangBuySearch.forEach(element2 => {
            if (element['barang_kode'] == element2['barang_kode']) {
              // console.log(element['index']);
              // console.log(element['amount']);
              element2['amount'] = element['amount'];
              element2['index'] = element['index'];
            }
          }
          );
        });
        // console.log(this.masterBarangBuySearch);

        // this.masterBarangBuySearch.forEach(element => {
        //   element['amount'] = 0;
        //   // element['index'] = this.masterBarangBuy.indexOf(element);
        //   // console.log(element);
        // }
        // );
        // this.masterBarangBuyPagination = data;
        // this.masterBarangBuyPagination.forEach(element => {
        //   element['amount'] = 0;
        //   element['index'] = this.masterBarangBuyPagination.indexOf(element);
        // });
      }
    );

    if (this.searchText == "") {
      this.isSearch = false;
      // console.log("false");
    }
  }

  async openModalBasket() {
    const modalBasket = await this.modalController.create({
      component: ModalbasketbuyComponent,
      componentProps: {
        masterBarangBasketBuy: this.masterBarangBasketBuy
      }
    });
    await modalBasket.present();

    this.currentModal = modalBasket;
  }
  nextClick() {
    this.storage.set('masterBarangBasketBuy', JSON.stringify(this.masterBarangBasketBuy));
    this.storage.set('masterBarangBuy', JSON.stringify(this.masterBarangBuy));
    this.storage.set('namaSupplier', this.namaSupplier);
    // this.storage.set('numOfItem', this.numOfItem);
    this.navCtrl.navigateForward('/checkoutbuy', {
      queryParams: {
        masterBarangBasketBuy: JSON.stringify(this.masterBarangBasketBuy),
        namaSupplier: this.namaSupplier
      }
    });
  }
  async openModal(index: number, barang_nama: string, barang_deskripsi: string, barang_hargajual: number, barang_hargabeli: number) {
    console.log(index);
    console.log(this.masterBarangBuyPagination);
    const modal = await this.modalController.create({
      component: ModaladdamountbuyComponent,
      componentProps: {
        index: index,
        barang_nama: barang_nama,
        barang_deskripsi: barang_deskripsi,
        barang_hargajual: barang_hargajual,
        amount: this.masterBarangBuy[index]['amount'],
        isEdit: this.isEdit,
        harga_beli_baru: barang_hargabeli
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const amount = data['data'];
        console.log(data);
        // console.log(data['data']['harga_beli_terakhir']);
        // console.log(data['data'] != 0);
        if (data['data'] == "False" && this.masterBarangBuy[index]['amount'] == 0) {
          this.masterBarangBuy[index]['amount'] = 0;
        } else if (data['data'] != "False" && data['data']['amount'] != 0 && data['data']['harga_beli_baru'] != 0) {
          this.masterBarangBuy[index]['amount'] = data['data']['amount'];
          this.masterBarangBuy[index]['barang_hargabeli_baru'] = data['data']['harga_beli_baru'];
        } else if (data['data'] != "False" && data['data']['amount'] == 0) {
          this.masterBarangBuy[index]['amount'] = 0;
        }
        // console.log(data);
        // console.log(amount);


        this.numOfItem = 0;
        this.masterBarangBasketBuy = [];
        this.masterBarangBuy.forEach(element => {
          if (element['amount'] > 0) {
            this.numOfItem++;
            this.masterBarangBasketBuy.push(element);
            this.masterBarangBasketBuy['barang_hargabeli_baru'] = data['data']['harga_beli_baru'];
          }
        }
        );
        // console.log( data['data'] );
        // console.log(this.masterBarangBuy[index]);
      });
    await modal.present();

    this.currentModal = modal;
  }
  refresh() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      this.storage.remove('masterBarangBasketBuy');
      this.storage.remove('masterBarangBuy');
      // this.ngOnInit();
      this.refresh();
      event.target.complete();
    }, 500);
  }
  async doRefresh2() {
    // console.log('masuk');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to empty buy cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Yes',
          handler: () => {

            this.storage.remove('masterBarangBasketBuy');
            this.storage.remove('masterBarangBuy');

            // this.ngOnInit();
            this.refresh();
          }
        }
      ]
    });
    await alert.present();
  }
  async ngOnInit() {
    this.masterBarangBuyList();
    // if(await this.storage.get('namaSupplier')!= null) {
    //   this.namaSupplier = await this.storage.get('namaSupplier');
    // }
    if(await this.storage.get('masterBarangBuy') != null) {
      this.masterBarangBuy = JSON.parse(await this.storage.get('masterBarangBuy'));
    }
    if (await this.storage.get('masterBarangBasketBuy') != null) {
      //get from storage
      // this.storage.remove('masterBarangBasketBuy');
      // this.storage.remove('masterBarangBuy');
      this.masterBarangBasketBuy = JSON.parse(await this.storage.get('masterBarangBasketBuy'));

      // console.log(this.namaSupplier);
      // console.log(this.masterBarangBasketBuy);
      // this.masterBarangBasketBuy.forEach(element => {
      //   this.masterBarangBuy.forEach(element2 => {
      //     if (element['index'] == element2['index']) {
      //       element2['amount'] = element['amount'];
      //     }
      //   });
      // });
      // console.log(this.masterBarangBuy);

      // this.masterBarangBuy.forEach(element => {
      //   element['amount'] = 0;
      // }
      // );
      if (this.masterBarangBuy != null) {
        this.masterBarangBuy.forEach(element => {
          if (element['amount'] > 0) {
            this.numOfItem++;
          }
        }
        );
      }
      // console.log(this.masterBarangBuy);
    }
  }

}
