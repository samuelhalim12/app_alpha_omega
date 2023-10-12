import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlphaomegaService } from '../alphaomega.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailhistorybeli',
  templateUrl: './detailhistorybeli.component.html',
  styleUrls: ['./detailhistorybeli.component.scss'],
})
export class DetailhistorybeliComponent implements OnInit {

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService,
    public alertController: AlertController, public toastController: ToastController) { }
  barang_kode: string = "";
  barang_jumlah = [];
  certainItem = [];
  // async updateItem(barang_kode:string) {
  //   this.router.navigate(['/updatemasterbarang', barang_kode]);
  // }

  // async deleteMasterBarang(barang_kode: string) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Confirm',
  //     message: 'Are you sure you want to delete this item?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {

  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: () => {

  //           this.ps.deleteMasterBarang(barang_kode).subscribe(
  //             (data) => {
  //               if (data['result'] == 'success') {
  //                 this.deleteSuccessToast();
  //                 this.router.navigate(['/masterbarang']);
  //               }
  //             }
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  // async deleteSuccessToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Delete Success!',
  //     duration: 1500
  //   });
  //   toast.present();
  // }
  ngOnInit() {
    this.barang_kode = this.at.snapshot.params['hbeli_id'];
    var barang_kodee = this.at.snapshot.params['hbeli_id'];
    this.ps.getCertainHbeli(barang_kodee).subscribe(
      (data) => {
        this.certainItem = data[0];
        this.barang_jumlah = data;
      }
    );
  }

}
