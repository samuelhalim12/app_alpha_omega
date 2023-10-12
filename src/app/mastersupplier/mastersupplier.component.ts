import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { actionSheetController } from '@ionic/core';
import { Storage } from '@ionic/storage-angular';
import { AlphaomegaService } from '../alphaomega.service';

@Component({
  selector: 'app-mastersupplier',
  templateUrl: './mastersupplier.component.html',
  styleUrls: ['./mastersupplier.component.scss'],
})
export class MastersupplierComponent implements OnInit {

  constructor(public location: Location, public router: Router, public alertController: AlertController, public toastController: ToastController, public as: AlphaomegaService, public storage: Storage) { }
  masterSupplier = [];
  searchText: string = "";
  masterSupplierList() {
    this.as.masterSupplierList().subscribe(
      (data) => {
        this.masterSupplier = data;
      }
    );
  }
  async searchFunction() {
    // console.log(this.searchText);
    // console.log($event);
    this.as.searchMasterSupplier(this.searchText).subscribe(
      (data) => {
        this.masterSupplier = data;
      }
    );
  }
  refresh() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      this.refresh();
      event.target.complete();
    }, 500);
  }
  async deleteSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Delete Success!',
      duration: 1500
    });
    toast.present();
  }
  async handleButtonPress(index: number) {
    const actionSheet = await actionSheetController.create({
      header: 'Action',
      buttons: [
        { text: 'Delete', role: 'destructive', handler: () => { this.deleteMasterSupplier(this.masterSupplier[index].supplier_id); } },
        //Update button go to update page
        { text: 'Update', handler: () => { this.router.navigate(['/updatemastersupplier', this.masterSupplier[index].supplier_id]); } },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await actionSheet.present();
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

            this.as.deleteMasterSupplier(supplier_id).subscribe(
              (data) => {
                if (data['result'] == 'success') {
                  this.deleteSuccessToast();
                  this.refresh();
                }
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  async ngOnInit() {
    this.masterSupplierList();
  }

}
