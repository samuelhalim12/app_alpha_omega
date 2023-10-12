import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlphaomegaService } from '../alphaomega.service';

@Component({
  selector: 'app-updatemastersupplier',
  templateUrl: './updatemastersupplier.component.html',
  styleUrls: ['./updatemastersupplier.component.scss'],
})
export class UpdatemastersupplierComponent implements OnInit {

  supplier_id: string = "";
  supplier_nama: string = "";
  supplier_alamat: string = "";
  supplier_telepon: string = "";
  certainSupplier = [];
  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService, public toastController: ToastController, public alertController: AlertController) { }
  updateSupplier() {
    this.ps.updateMasterSupplier(this.supplier_id, this.supplier_nama, this.supplier_alamat, this.supplier_telepon).subscribe(
      (data) => {
        if (data['result'] == "Update Success!") {
          this.updateSuccessToast();
          this.router.navigateByUrl('/mastersupplier');
        } else {
          alert(data['result']);
        }
      }
    );
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
  async deleteMasterSupplier(supplier_id: string) {
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

            this.ps.deleteMasterSupplier(supplier_id).subscribe(
              (data) => {
                if (data['result'] == 'success') {
                  this.deleteSuccessToast();
                  // this.refresh();
                  this.router.navigate(['/mastersupplier']);
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
    this.supplier_id = this.at.snapshot.params['supplier_id'];
    var supplier_idd = this.at.snapshot.params['supplier_id'];
    this.ps.getCertainSupplier(supplier_idd).subscribe(
      (data) => {
        this.certainSupplier = data[0];
      }
    );
  }

}
