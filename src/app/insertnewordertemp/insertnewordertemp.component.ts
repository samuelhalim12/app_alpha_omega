import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlphaomegaService } from '../alphaomega.service';
import { ModaltemporderitemComponent } from '../modaltemporderitem/modaltemporderitem.component';
import { ModalbasketComponent } from '../modalbasket/modalbasket.component';

@Component({
  selector: 'app-insertnewordertemp',
  templateUrl: './insertnewordertemp.component.html',
  styleUrls: ['./insertnewordertemp.component.scss'],
})
export class InsertnewordertempComponent implements OnInit {

  constructor(public navCtrl: NavController, public location: Location, public router: Router, public modalController: ModalController,
    public alertController: AlertController, public toastController: ToastController, public as: AlphaomegaService, public storage: Storage) { }
  masterBarang = [];
  masterBarangBasket = [];
  masterBarangPagination = [];
  searchText: string = "";
  currentModal = null;
  numOfItem = 0;
  namaPembeli: string = "";
  isEdit: boolean = false;
  page: number = 1;
  max: number = 0;
  startNum: number = 0;
  endNum: number = 24;
  isSearch = false;
  masterBarangSearch = [];
  // amount:number = 0;
  masterBarangList() {
    this.as.masterBarangList().subscribe(
      (data) => {
        this.masterBarang = data;
        this.masterBarang.forEach(element => {
          element['amount'] = 0;
          // if(element['amount']>0){

          // } else {
          //   element['amount'] = 0;
          // }
          element['index'] = this.masterBarang.indexOf(element);
        }
        );
        // console.log(this.masterBarangBasket);
        this.masterBarangBasket.forEach(element => {
          this.masterBarang.forEach(element2 => {
            if (element['index'] == element2['index']) {
              element2['amount'] = element['amount'];
            }
          });
        });
        this.masterBarangPagination = this.masterBarangPagination.concat(this.masterBarang.slice(this.startNum, this.endNum));
        this.masterBarangPagination.forEach(element => {
          if (element['amount'] > 0) {

          } else {
            element['amount'] = 0;
          }
          element['index'] = this.masterBarangPagination.indexOf(element);
        }
        );
        this.startNum = this.endNum;
        if (this.endNum + 24 > this.masterBarang.length) {
          this.endNum = this.masterBarang.length;
        } else {
          this.endNum = this.endNum + 24;
        }
        this.max = Math.ceil(this.masterBarang.length / 25);

        // console.log(this.max);
        // if(event){
        //   event.target.complete();
        // }
        // console.log(this.masterBarangPagination);
      }
    );
  }
  masterBarangList2(event?) {
    this.as.masterBarangList().subscribe(
      (data) => {
        // this.masterBarang = data;
        // this.masterBarang.forEach(element => {
        //   if(element['amount']>0){

        //   } else {
        //     element['amount'] = 0;
        //   }
        //   element['index'] = this.masterBarang.indexOf(element);
        // }
        // );
        // console.log(this.startNum);
        // console.log(this.endNum);
        this.masterBarangPagination = this.masterBarangPagination.concat(this.masterBarang.slice(this.startNum, this.endNum));
        // generate for loop
        for (let i = this.startNum; i < this.endNum; i++) {
          // console.log ("Block statement execution no." + i);
          this.masterBarangPagination[i]['index'] = this.masterBarangPagination.indexOf(this.masterBarangPagination[i]);
          this.masterBarangPagination[i]['amount'] = this.masterBarang[i]['amount'];
        }

        // this.masterBarangPagination.forEach(element => {
        //   if(element['amount']>0){

        //   } else {
        //     element['amount'] = 0;
        //   }
        //   element['index'] = this.masterBarangPagination.indexOf(element);
        // }
        // );
        this.startNum = this.endNum;
        if (this.endNum + 24 > this.masterBarang.length) {
          this.endNum = this.masterBarang.length;
        } else {
          this.endNum = this.endNum + 24;
        }
        this.max = Math.ceil(this.masterBarang.length / 25);

        // console.log(this.max);
        if (event) {
          event.target.complete();
        }
        // console.log(this.masterBarangPagination);
        // console.log(this.masterBarang);
      }
    );
  }
  loadProductMore(event) {
    this.page++;
    this.masterBarangList2(event);
    if (this.page == this.max) {
      event.target.disabled = true;
    }
  }
  searchFunction() {
    // console.log(this.searchText);
    // console.log($event);
    // console.log(this.masterBarang);
    this.isSearch = true;
    this.as.searchMasterBarang(this.searchText).subscribe(
      (data) => {
        this.masterBarangSearch = data;
        this.masterBarang.forEach(element => {
          this.masterBarangSearch.forEach(element2 => {
            if (element['barang_kode'] == element2['barang_kode']) {
              // console.log(element['index']);
              // console.log(element['amount']);
              element2['amount'] = element['amount'];
              element2['index'] = element['index'];
            }
          }
          );
        });
        // console.log(this.masterBarangSearch);

        // this.masterBarangSearch.forEach(element => {
        //   element['amount'] = 0;
        //   // element['index'] = this.masterBarang.indexOf(element);
        //   // console.log(element);
        // }
        // );
        // this.masterBarangPagination = data;
        // this.masterBarangPagination.forEach(element => {
        //   element['amount'] = 0;
        //   element['index'] = this.masterBarangPagination.indexOf(element);
        // });
      }
    );

    if (this.searchText == "") {
      this.isSearch = false;
      // console.log("false");
    }
    // console.log(this.masterBarang);
  }

  async openModalBasket() {
    // console.log('masuk')
    const modalBasket = await this.modalController.create({
      component: ModalbasketComponent,
      componentProps: {
        masterBarangBasket: this.masterBarangBasket
      }
    });
    await modalBasket.present();

    this.currentModal = modalBasket;
  }
  nextClick() {
    this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));
    this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
    this.storage.set('namaPembeli', this.namaPembeli);
    // this.storage.set('numOfItem', this.numOfItem);
    this.navCtrl.navigateForward('/checkoutdraftorder', {
      queryParams: {
        masterBarangBasket: JSON.stringify(this.masterBarangBasket),
        namaPembeli: this.namaPembeli
      }
    });
  }
  async openModal(index: number, barang_nama: string, barang_deskripsi: string, barang_hargajual: number) {
    // console.log(index);
    // console.log(this.masterBarangPagination);
    const modal = await this.modalController.create({
      component: ModaltemporderitemComponent,
      componentProps: {
        index: index,
        barang_nama: barang_nama,
        barang_deskripsi: barang_deskripsi,
        barang_hargajual: barang_hargajual,
        amount: this.masterBarang[index]['amount'],
        isEdit: this.isEdit
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const amount = data['data'];
        // console.log(data['data'] != false);
        // console.log(data['data'] != 0);
        if (data['data'] == "False" && this.masterBarang[index]['amount'] == 0) {
          this.masterBarang[index]['amount'] = 0;
        } else if (data['data'] != "False" && data['data'] != 0) {
          this.masterBarang[index]['amount'] = amount;
        } else if (data['data'] != "False" && data['data'] == 0) {
          this.masterBarang[index]['amount'] = 0;
        }
        // console.log(data);
        // console.log(amount);


        this.numOfItem = 0;
        this.masterBarangBasket = [];
        this.masterBarang.forEach(element => {
          if (element['amount'] > 0) {
            this.numOfItem++;
            this.masterBarangBasket.push(element);
          }
        }
        );
        // console.log( data['data'] );
        // console.log(this.masterBarang[index]);
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
      this.storage.remove('masterBarangBasket');
      this.storage.remove('masterBarang');
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
      message: 'Are you sure you want to empty cart?',
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

            this.storage.remove('masterBarangBasket');
            this.storage.remove('masterBarang');
            // this.ngOnInit();
            this.refresh();
          }
        }
      ]
    });
    await alert.present();
  }

  async ngOnInit() {

    if (await this.storage.get('namaPembeli') != null) {
      this.namaPembeli = await this.storage.get('namaPembeli');
    }
    if (await this.storage.get('masterBarang') != null) {
      this.masterBarang = JSON.parse(await this.storage.get('masterBarang'));
    }
    if (await this.storage.get('masterBarangBasket') != null) {
      //get from storage
      this.masterBarangBasket = JSON.parse(await this.storage.get('masterBarangBasket'));

      // console.log(this.namaPembeli);

      // console.log(this.masterBarang);
    }
    this.masterBarangList();
    // console.log(this.masterBarangBasket);
    // this.masterBarangBasket.forEach(element => {
    //   this.masterBarang.forEach(element2 => {
    //     if (element['index'] == element2['index']) {
    //       element2['amount'] = element['amount'];
    //     }
    //   });
    // });
    // console.log(this.masterBarang);

    // this.masterBarang.forEach(element => {
    //   element['amount'] = 0;
    // }
    // );
    if (this.masterBarang != null) {
      this.masterBarang.forEach(element => {
        if (element['amount'] > 0) {
          this.numOfItem++;
        }
      }
      );
    }
  }

}
