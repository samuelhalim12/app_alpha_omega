import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlphaomegaService } from '../alphaomega.service';
import { ModaltemporderitemComponent } from '../modaltemporderitem/modaltemporderitem.component';

@Component({
  selector: 'app-checkoutdraftorder',
  templateUrl: './checkoutdraftorder.component.html',
  styleUrls: ['./checkoutdraftorder.component.scss'],
})
export class CheckoutdraftorderComponent implements OnInit {

  // constructor(public navCtrl: NavController, public route: ActivatedRoute, public platform: Platform, public storage: Storage) {
  //     this.platform.backButton.subscribeWithPriority(10, () => {
  //       this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));
  //       this.storage.set('namaPembeli', this.namaPembeli);
  //     });
  //   }
  constructor(public navCtrl: NavController, public route: ActivatedRoute, public platform: Platform, public storage: Storage,
    public modalController: ModalController, public alertController: AlertController, public ps: AlphaomegaService, public router: Router,
    public toastController: ToastController) {
  }
  currentModal: any;
  numOfItem: number = 0;
  masterBarangBasket = [];
  masterBarang = [];
  namaPembeli: any;
  isEdit: boolean = true;
  penjual_id: any;
  hjual_temp_jumlah: number = 0;
  barang_kode: string[] = [];
  djual_temp_banyak: number[] = [];
  totalJualPrice = 0;
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  async deleteItem(index: number) {
    // console.log(this.masterBarangBasket);
    // console.log(index);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            if (this.masterBarangBasket[index]['amount'] == 0) {
              this.masterBarangBasket[index]['amount'] = 1;
              this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = 1;
              this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));
              this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
            }
          }
        }, {
          text: 'Yes',
          handler: () => {
            // console.log(this.masterBarang[this.masterBarangBasket[index]['index']]['amount']);

            this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = 0;
            this.masterBarangBasket[index]['amount'] = 0;
            this.masterBarangBasket.splice(index, 1);
            this.totalSellPrice();
            // if(this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] != 0){
            //   this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
            // }
            // console.log(this.masterBarang[this.masterBarangBasket[index]['index']]['amount']);
            // this.storage.set('masterBarang', JSON.stringify(this.masterBarang));


            // this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));

          }
        }
      ]
    });
    await alert.present();
  }
  async editItem(index: number) {
    const modal = await this.modalController.create({
      component: ModaltemporderitemComponent,
      componentProps: {
        index: this.masterBarangBasket[index]['index'],
        barang_nama: this.masterBarangBasket[index]['barang_nama'],
        barang_deskripsi: this.masterBarangBasket[index]['barang_deskripsi'],
        barang_hargajual: this.masterBarangBasket[index]['barang_hargajual'],
        amount: this.masterBarangBasket[index]['amount'],
        isEdit: this.isEdit
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        const amount = data['data'];
        // console.log(data);
        // console.log(data['data'] != "False")
        // console.log(data['data'] == 0)
        if (data['data'] == "False" && this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] == 0) {
          this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = 0;
        } else if (data['data'] != "False" && data['data'] != 0) {
          this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = amount;
        } else if (data['data'] != "False" && data['data'] == 0) {
          this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = 0;
        }
        this.numOfItem = 0;
        this.masterBarangBasket = [];
        this.masterBarang.forEach(element => {
          if (element['amount'] > 0) {
            this.numOfItem++;
            this.masterBarangBasket.push(element);
          }
        }
        );
        // console.log(this.masterBarangBasket);
        this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));
        this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
        // console.log( data['data'] );
        // console.log(this.masterBarang[index]);
      });
    await modal.present();

    this.currentModal = modal;
  }
  async buttonOK() {

    if (this.masterBarangBasket.length == 0) {
      alert('Masukkan barang ke dalam keranjang');
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm',
        message: 'Are you sure you want to checkout?',
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
              this.djual_temp_banyak = [];
              this.barang_kode = [];
              this.masterBarangBasket.forEach(element => {
                if (element['amount'] > 0) {
                  this.hjual_temp_jumlah += element['amount'] * element['barang_hargajual'];
                  this.barang_kode.push(element['barang_kode']);
                  this.djual_temp_banyak.push(element['amount']);
                }
              }
              );
              this.ps.checkoutOrderTemp(this.penjual_id, this.namaPembeli, this.hjual_temp_jumlah, this.barang_kode, this.djual_temp_banyak).subscribe(
                (data) => {
                  if (data['result'] == 'success') {
                    //destroy storage

                    this.storage.remove('masterBarangBasket');
                    this.storage.remove('masterBarang');
                    this.storage.remove('namaPembeli');

                    this.deleteSuccessToast();
                    this.router.navigate(['/order']);
                  }
                }
              );
            }
          }
        ]
      });
      await alert.present();
    }
  }
  gantiNama() {
    this.storage.set('namaPembeli', this.namaPembeli);
  }
  totalSellPrice() {
    this.totalJualPrice = 0;
    this.masterBarangBasket.forEach(element => {
      if (element['amount'] > 0) {
        // console.log('element : ', element['amount']);
        this.totalJualPrice += element['amount'] * element['barang_hargajual'];
      }
      this.masterBarang.forEach(element2 => {
        if (element2['amount'] > 0 && element2['barang_kode'] == element['barang_kode']) {
          // this.numOfItem++;
          // get index of element2
          element2['amount'] = element['amount'];
          // console.log('element 2: ', element2['amount']);
          // this.masterBarangBasket.push(element);
        }
      }
      );
    }
    );
    // this.numOfItem = 0;
    // this.masterBarangBasket = [];

    this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));
    this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
  }
  async minusAmount(i: number) {
    // console.log('true');
    if (this.masterBarangBasket[i]['amount'] > 0) {
      this.masterBarangBasket[i]['amount'] = this.masterBarangBasket[i]['amount'] - 1;
      // console.log(this.masterBarangBasket[i]['amount']);
      // if(this.masterBarangBasket[i]['amount']==0){
      //   this.deleteItem(i);
      // }
    } else {
      this.masterBarangBasket[i]['amount'] = 0;
    }
    if (this.masterBarangBasket[i]['amount'] == 0) {
      this.deleteItem(i);
    }
  }
  async updateAmount(index: number) {
    console.log(index);
    this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = this.masterBarangBasket[index]['amount'];
    console.log(this.masterBarang[this.masterBarangBasket[index]['index']]['amount']);
    console.log(this.masterBarangBasket[index]['amount']);
    if (this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] != 0) {
      this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
    }
  }
  async deleteSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Checkout Success!',
      duration: 1500
    });
    toast.present();
  }
  async ngOnInit() {
    if (await this.storage.get('penjual_id') != null) {
      this.penjual_id = await this.storage.get('penjual_id');
      console.log(this.penjual_id);
    }
    if(await this.storage.get('namaPembeli') != null) {
      this.namaPembeli = await this.storage.get('namaPembeli');
    }
    // this.masterBarangBasket = JSON.parse(this.route.snapshot.queryParams['masterBarangBasket']);
    // this.namaPembeli = this.route.snapshot.queryParams['namaPembeli'];
    if (this.storage.get('masterBarangBasket') != null) {
      //get from storage
      this.masterBarangBasket = JSON.parse(await this.storage.get('masterBarangBasket'));
      this.masterBarang = JSON.parse(await this.storage.get('masterBarang'));

      this.masterBarangBasket.forEach(element => {
        this.masterBarang.forEach(element2 => {
          if (element['index'] == element2['index']) {
            element2['amount'] = element['amount'];
          }
        });
      });
      // this.totalJualPrice = 0;
      // this.masterBarangBasket.forEach(element => {
      //   if (element['amount'] > 0) {
      //     this.totalJualPrice += element['amount'] * element['barang_hargajual'];
      //   }
      // }
      // );
      this.totalSellPrice();
      // console.log(this.totalJualPrice);
      // console.log(this.namaPembeli);
      // console.log(this.masterBarangBasket);
    }
    // this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));
    // this.storage.set('namaPembeli', this.namaPembeli);
    // console.log(this.masterBarangBasket);
    // console.log(this.namaPembeli);
  }

}
