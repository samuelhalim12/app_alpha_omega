import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlphaomegaService } from '../alphaomega.service';
import { format } from "date-fns";
@Component({
  selector: 'app-updatemasterpenjual',
  templateUrl: './updatemasterpenjual.component.html',
  styleUrls: ['./updatemasterpenjual.component.scss'],
})
export class UpdatemasterpenjualComponent implements OnInit {

  penjual_id: string = "";
  penjual_nama: string = "";
  penjual_username: string = "";
  penjual_password: string = "";
  role: string = "";
  certainSeller = [];
  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService, public alertController: AlertController, public toastController: ToastController) { }
  updateSeller() {
    this.ps.updateMasterPenjual(this.penjual_id, this.penjual_nama, this.penjual_username, this.penjual_password, this.role).subscribe(
      (data) => {
        if (data['result'] == "Update Success!") {
          this.updateSuccessToast();
          this.router.navigateByUrl('/masterpenjual');
        } else {
          alert(data['result']);
        }
      }
    );
  }
  compareFn(e1: string, e2: string): boolean {
    return e1 && e2 ? e1 == e2 : e1 == e2;
  }
  async updateSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Update Success!',
      duration: 1500
    });
    toast.present();
  }
  async deleteSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Delete Success!',
      duration: 1500
    });
    toast.present();
  }
  async deleteMasterPenjual(penjual_id: string) {
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

          }
        }, {
          text: 'Yes',
          handler: () => {

            this.ps.deleteMasterPenjual(penjual_id).subscribe(
              (data) => {
                if (data['result'] == 'success') {
                  this.deleteSuccessToast();
                  // this.refresh();
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
  ngOnInit() {
    this.penjual_id = this.at.snapshot.params['penjual_id'];
    var penjual_idd = this.at.snapshot.params['penjual_id'];
    this.ps.getCertainSeller(penjual_idd).subscribe(
      (data) => {
        this.role = data[0]['role'];
        this.certainSeller = data[0];
        const tanggalMasuk = new Date(this.certainSeller['penjual_tanggalmasuk']);
        const tanggalMasukk = new Date(tanggalMasuk.getFullYear(), tanggalMasuk.getMonth(), tanggalMasuk.getDate());
        this.certainSeller['penjual_tanggalmasuk'] = format(tanggalMasukk, "dd-MM-yyyy");
      }
    );
  }

}
