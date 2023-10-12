import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlphaomegaService } from '../alphaomega.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detailmasterpenjual',
  templateUrl: './detailmasterpenjual.component.html',
  styleUrls: ['./detailmasterpenjual.component.scss'],
})
export class DetailmasterpenjualComponent implements OnInit {

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService,
    public alertController: AlertController, public toastController: ToastController) { }
  penjual_id: string = "";

  certainSeller = [];
  async updateSeller(penjual_id: string) {
    this.router.navigate(['/updatemasterpenjual', penjual_id]);
  }

  async deleteMasterPenjual(penjual_id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Are you sure you want to delete this seller?',
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

            this.ps.deleteMasterPenjual(penjual_id).subscribe(
              (data) => {
                if (data['result'] == 'success') {
                  this.deleteSuccessToast();
                  this.router.navigate(['/masterpenjual']);
                }
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
  async deleteSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Delete Success!',
      duration: 1500
    });
    toast.present();
  }
  ngOnInit() {
    this.penjual_id = this.at.snapshot.params['penjual_id'];
    var penjual_idd = this.at.snapshot.params['penjual_id'];
    this.ps.getCertainSeller(penjual_idd).subscribe(
      (data) => {
        this.certainSeller = data[0];
      }
    );
  }
}
