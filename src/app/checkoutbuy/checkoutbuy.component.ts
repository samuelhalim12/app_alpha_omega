import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlphaomegaService } from '../alphaomega.service';
import { ModaltemporderitemComponent } from '../modaltemporderitem/modaltemporderitem.component';
@Component({
  selector: 'app-checkoutbuy',
  templateUrl: './checkoutbuy.component.html',
  styleUrls: ['./checkoutbuy.component.scss'],
})
export class CheckoutbuyComponent implements OnInit {

  constructor(public navCtrl: NavController, public route: ActivatedRoute, public platform: Platform, public storage: Storage,
    public modalController: ModalController, public alertController: AlertController, public ps: AlphaomegaService, public router: Router,
    public toastController: ToastController) {
  }
  currentModal: any;
  numOfItem: number = 0;
  masterBarangBasketBuy = [];
  masterBarangBuy = [];
  masterSupplier = [];
  idSupplier: string;
  metodePembayaran: string;
  isEdit: boolean = true;
  penjual_id: any;
  hjual_temp_jumlah: number = 0;
  barang_kode: string[] = [];
  hargabeli_baru = [];
  totalPrice = 0;
  kembalian = 0;
  nominalBayar: number;
  barang_stok = [];
  djual_temp_banyak: number[] = [];
  supplierList() {
    this.ps.masterSupplierList().subscribe(
      (data) => {
        this.masterSupplier = data;
        if (this.idSupplier == null) {
          this.idSupplier = this.masterSupplier[0]['supplier_id'];
        }

        // console.log(this.idSupplier);
        // console.log(data);
      }
    );
  }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  compareFn(e1: string, e2: string): boolean {
    return e1 && e2 ? e1 == e2 : e1 == e2;
  }
  async deleteItem(index: number) {
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
            if (this.masterBarangBasketBuy[index]['amount'] == 0) {
              this.masterBarangBasketBuy[index]['amount'] = 1;
              this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] = 1;
              this.storage.set('masterBarangBasketBuy', JSON.stringify(this.masterBarangBasketBuy));
              this.storage.set('masterBarangBuy', JSON.stringify(this.masterBarangBuy));
            }
          }
        }, {
          text: 'Yes',
          handler: () => {
            // console.log(this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount']);

            this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] = 0;
            // if(this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] != 0){
            //   this.storage.set('masterBarangBuy', JSON.stringify(this.masterBarangBuy));
            // }
            // console.log(this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount']);
            this.storage.set('masterBarangBuy', JSON.stringify(this.masterBarangBuy));

            this.masterBarangBasketBuy.splice(index, 1);
            this.storage.set('masterBarangBasketBuy', JSON.stringify(this.masterBarangBasketBuy));

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
        index: this.masterBarangBasketBuy[index]['index'],
        barang_nama: this.masterBarangBasketBuy[index]['barang_nama'],
        barang_deskripsi: this.masterBarangBasketBuy[index]['barang_deskripsi'],
        barang_hargajual: this.masterBarangBasketBuy[index]['barang_hargajual'],
        amount: this.masterBarangBasketBuy[index]['amount'],
        isEdit: this.isEdit
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        const amount = data['data'];
        // console.log(data);
        // console.log(data['data'] != "False")
        // console.log(data['data'] == 0)
        if (data['data'] == "False" && this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] == 0) {
          this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] = 0;
        } else if (data['data'] != "False" && data['data'] != 0) {
          this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] = amount;
        } else if (data['data'] != "False" && data['data'] == 0) {
          this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] = 0;
        }
        this.numOfItem = 0;
        this.masterBarangBasketBuy = [];
        this.masterBarangBuy.forEach(element => {
          if (element['amount'] > 0) {
            this.numOfItem++;
            this.masterBarangBasketBuy.push(element);
          }
        }
        );
        // console.log(this.masterBarangBasketBuy);
        this.storage.set('masterBarangBasketBuy', JSON.stringify(this.masterBarangBasketBuy));
        this.storage.set('masterBarangBuy', JSON.stringify(this.masterBarangBuy));
        // console.log( data['data'] );
        // console.log(this.masterBarangBuy[index]);
      });
    await modal.present();

    this.currentModal = modal;
  }
  gantiIdSupplier() {
    // console.log(this.idSupplier)
    // this.idSupplier = this.masterSupplier[this.idSupplier]['supplier_id'];
    this.storage.set('idSupplier', this.idSupplier);
  }
  gantiMetodePembayaran() {
    // console.log(this.metodePembayaran)
    this.storage.set('metodePembayaranBeli', this.metodePembayaran);
  }
  async buttonOK() {

    if (this.masterBarangBasketBuy.length == 0) {
      alert('Masukkan barang ke dalam keranjang');
    } else if (this.nominalBayar < this.hjual_temp_jumlah) {
      alert('Nominal bayar tidak mencukupi');
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm',
        message: 'Are you sure you want to checkout buy?',
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
              this.barang_kode = [];
              this.hargabeli_baru = [];
              this.djual_temp_banyak = [];
              this.barang_stok = [];
              // console.log(this.nominalBayar);
              // console.log(this.hjual_temp_jumlah);
              this.masterBarangBasketBuy.forEach(element => {
                if (element['amount'] > 0) {
                  // this.hjual_temp_jumlah += element['amount'] * element['barang_hargajual'];
                  this.barang_kode.push(element['barang_kode']);
                  this.djual_temp_banyak.push(element['amount']);
                  this.hargabeli_baru.push(element['barang_hargabeli_baru']);
                  this.barang_stok.push(parseInt(element['barang_stok']) + parseInt(element['amount']));
                }
              }
              );
              this.ps.checkoutBuy(this.idSupplier, this.penjual_id, this.hjual_temp_jumlah, this.nominalBayar,
                this.metodePembayaran, this.kembalian, this.barang_kode, this.djual_temp_banyak, this.hargabeli_baru, this.barang_stok).subscribe(
                  (data) => {
                    if (data['result'] == 'success') {
                      //destroy storage
                      this.storage.remove('masterBarangBasketBuy');
                      this.storage.remove('masterBarangBuy');
                      this.storage.remove('idSupplier');
                      this.storage.remove('nominalBayarBeli');
                      this.storage.remove('metodePembayaranBeli');
                      this.deleteSuccessToast();
                      this.router.navigate(['/historybeli']);
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
  async minusAmount(i: number) {
    // console.log('true');
    if (this.masterBarangBasketBuy[i]['amount'] > 0) {
      this.masterBarangBasketBuy[i]['amount'] = this.masterBarangBasketBuy[i]['amount'] - 1;
      // console.log(this.masterBarangBasketBuy[i]['amount']);
      // if(this.masterBarangBasketBuy[i]['amount']==0){
      //   this.deleteItem(i);
      // }
    } else {
      this.masterBarangBasketBuy[i]['amount'] = 0;
    }
    if (this.masterBarangBasketBuy[i]['amount'] == 0) {
      this.deleteItem(i);
    }
  }
  async updateAmount(index: number) {
    console.log(index);
    this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] = this.masterBarangBasketBuy[index]['amount'];
    console.log(this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount']);
    console.log(this.masterBarangBasketBuy[index]['amount']);
    if (this.masterBarangBuy[this.masterBarangBasketBuy[index]['index']]['amount'] != 0) {
      this.storage.set('masterBarangBuy', JSON.stringify(this.masterBarangBuy));
    }
  }
  totalBuyPrice() {
    // foreach loop masterBarangBasketBuy
    this.hjual_temp_jumlah = 0;
    this.masterBarangBasketBuy.forEach(element => {
      this.hjual_temp_jumlah += element['amount'] * element['barang_hargabeli_baru']
    });
    console.log(this.hjual_temp_jumlah);
    this.hitungKembalian();
    return this.hjual_temp_jumlah;
  }
  hitungKembalian() {
    //absolute
    if (this.hjual_temp_jumlah < this.nominalBayar) {
      this.kembalian = Math.abs(this.hjual_temp_jumlah - this.nominalBayar);
    } else {
      this.kembalian = 0;
    }
    this.storage.set('nominalBayarBeli', this.nominalBayar);
    return this.kembalian;
  }
  async deleteSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Buy Checkout Success!',
      duration: 1500
    });
    toast.present();
  }
  async ngOnInit() {
    this.metodePembayaran = "Cash";
    this.idSupplier = await this.storage.get('idSupplier');
    this.nominalBayar = await this.storage.get('nominalBayarBeli');
    this.metodePembayaran = await this.storage.get('metodePembayaranBeli');

    if (await this.storage.get('penjual_id') != null) {
      this.penjual_id = await this.storage.get('penjual_id');
      console.log(this.penjual_id);
    }
    // this.masterBarangBasketBuy = JSON.parse(this.route.snapshot.queryParams['masterBarangBasketBuy']);
    // this.idSupplier = this.route.snapshot.queryParams['idSupplier'];
    if (this.storage.get('masterBarangBasketBuy') != null) {
      //get from storage
      this.masterBarangBasketBuy = JSON.parse(await this.storage.get('masterBarangBasketBuy'));
      this.masterBarangBuy = JSON.parse(await this.storage.get('masterBarangBuy'));
      // console.log(this.idSupplier);
      // console.log(this.masterBarangBasketBuy);
    }
    this.supplierList();

    // console.log(this.idSupplier)
    this.totalBuyPrice();

    // this.storage.set('masterBarangBasketBuy', JSON.stringify(this.masterBarangBasketBuy));
    // this.storage.set('idSupplier', this.idSupplier);
    // console.log(this.masterBarangBasketBuy);
    // console.log(this.idSupplier);
  }

}
