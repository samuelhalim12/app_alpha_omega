import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlphaomegaService } from '../alphaomega.service';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-detailordertemp',
  templateUrl: './detailordertemp.component.html',
  styleUrls: ['./detailordertemp.component.scss'],
})
export class DetailordertempComponent implements OnInit {

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService,
    public alertController: AlertController, public toastController: ToastController, public storage: Storage) { }
  hjual_temp_id: number;
  barang_jumlah = [];
  certainOrderTemp = [];
  hjual_temp_jumlah: number = 0;
  barang_kode: string[] = [];
  djual_temp_banyak: number[] = [];
  penjual_id: any;
  // namaPembeli: any;
  async updateOrderTemp(hjual_temp_id: number) {
    this.router.navigate(['/updateordertemp', hjual_temp_id]);
  }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            this.barang_jumlah[index]['djual_temp_banyak'] += 1;
          }
        }, {
          text: 'Yes',
          handler: () => {
            // console.log(this.masterBarang[this.masterBarangBasket[index]['index']]['amount']);

            // this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = 0;
            // if(this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] != 0){
            //   this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
            // }
            // console.log(this.masterBarang[this.masterBarangBasket[index]['index']]['amount']);
            // this.storage.set('masterBarang', JSON.stringify(this.masterBarang));

            this.barang_jumlah.splice(index, 1);
            // this.storage.set('masterBarangBasket', JSON.stringify(this.masterBarangBasket));

          }
        }
      ]
    });
    await alert.present();
  }
  async deleteSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Update Draft Order Success!',
      duration: 1500
    });
    toast.present();
  }
  async failToast() {
    const toast = await this.toastController.create({
      message: 'Draft Order Deleted!',
      duration: 1500
    });
    toast.present();
  }
  async minusAmount(i: number) {
    // console.log('true');
    if (this.barang_jumlah[i]['djual_temp_banyak'] > 0) {
      this.barang_jumlah[i]['djual_temp_banyak'] = this.barang_jumlah[i]['djual_temp_banyak'] - 1;
      // console.log(this.barang_jumlah[i]['djual_temp_banyak']);
      // if(this.barang_jumlah[i]['djual_temp_banyak']==0){
      //   this.deleteItem(i);
      // }
    } else {
      this.barang_jumlah[i]['djual_temp_banyak'] = 0;
    }
    if (this.barang_jumlah[i]['djual_temp_banyak'] == 0) {
      this.deleteItem(i);
    }
  }
  async buttonSave() {
    this.barang_jumlah.forEach(element => {
      if (element['djual_temp_banyak'] > 0) {
        this.hjual_temp_jumlah += element['djual_temp_banyak'] * element['barang_hargajual'];
        this.barang_kode.push(element['barang_kode']);
        this.djual_temp_banyak.push(element['djual_temp_banyak']);
      }
    }
    );
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

            this.ps.updateOrderTemp(this.penjual_id, this.certainOrderTemp['hjual_temp_pembeli'], this.hjual_temp_jumlah,
              this.barang_kode, this.djual_temp_banyak, this.hjual_temp_id).subscribe(
                (data) => {
                  if (data['result'] == 'success') {
                    //destroy storage
                    this.deleteSuccessToast();
                    this.router.navigate(['/order']);
                  } else if (data['result'] == 'No Data Inserted!') {
                    this.failToast();
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
  async deleteOrderTemp(hjual_temp_id: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to delete this temporary order?',
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

            this.ps.deleteOrderTemp(hjual_temp_id).subscribe(
              (data) => {
                if (data['result'] == 'success') {
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
  // async updateAmount(index:number) {
  //   // console.log(index);
  //   // this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] = this.masterBarangBasket[index]['amount'];
  //   // console.log(this.masterBarang[this.masterBarangBasket[index]['index']]['amount']);
  //   // console.log(this.masterBarangBasket[index]['amount']);
  //   // if(this.masterBarang[this.masterBarangBasket[index]['index']]['amount'] != 0){
  //     // this.storage.set('masterBarang', JSON.stringify(this.masterBarang));
  //   // }

  // }
  async ngOnInit() {
    if (await this.storage.get('penjual_id') != null) {
      this.penjual_id = await this.storage.get('penjual_id');
      // console.log(this.penjual_id);
    }
    this.hjual_temp_id = this.at.snapshot.params['hjual_temp_id'];
    var hjual_temp_idd = this.at.snapshot.params['hjual_temp_id'];
    this.ps.getCertainOrderTemp(hjual_temp_idd).subscribe(
      (data) => {
        this.certainOrderTemp = data[0];
        this.barang_jumlah = data;
      }
    );
  }

}
