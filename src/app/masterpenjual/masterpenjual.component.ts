import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { actionSheetController } from '@ionic/core';
import { Storage } from '@ionic/storage-angular';
import { AlphaomegaService } from '../alphaomega.service';

@Component({
  selector: 'app-masterpenjual',
  templateUrl: './masterpenjual.component.html',
  styleUrls: ['./masterpenjual.component.scss'],
})
export class MasterpenjualComponent implements OnInit {

  constructor(public location: Location, public router: Router, public alertController: AlertController, public toastController: ToastController, public as: AlphaomegaService, public storage: Storage) { }
  masterPenjual = [];
  searchText: string = "";
  masterPenjualList() {
    this.as.masterPenjualList().subscribe(
      (data) => {
        this.masterPenjual = data;
      }
    );
  }
  async searchFunction() {
    // console.log(this.searchText);
    // console.log($event);
    this.as.searchMasterPenjual(this.searchText).subscribe(
      (data) => {
        this.masterPenjual = data;
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
        { text: 'Delete', role: 'destructive', handler: () => { this.deleteMasterPenjual(this.masterPenjual[index].penjual_id); } },
        //Update button go to update page
        { text: 'Update', handler: () => { this.router.navigate(['/updatemasterpenjual', this.masterPenjual[index].penjual_id]); } },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await actionSheet.present();
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

            this.as.deleteMasterPenjual(penjual_id).subscribe(
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
    this.masterPenjualList();
  }

}
