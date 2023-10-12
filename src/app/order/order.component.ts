import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { actionSheetController, alertController } from '@ionic/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlphaomegaService } from '../alphaomega.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor(public location: Location, public router: Router, public alertController: AlertController, public toastController: ToastController, public as: AlphaomegaService, public storage: Storage) { }
  orderTemp = [];
  searchText: string = "";
  orderTempList() {
    this.as.orderTempList().subscribe(
      (data) => {
        this.orderTemp = data;
      }
    );
  }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  async searchFunction() {
    // console.log(this.searchText);
    // console.log($event);
    this.as.searchOrderTemp(this.searchText).subscribe(
      (data) => {
        this.orderTemp = data;
      }
    );
  }
  refresh() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
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
        { text: 'Delete', role: 'destructive', handler: () => { this.deleteOrderTemp(this.orderTemp[index].hjual_temp_id); } },
        //Update button go to update page
        { text: 'Update', handler: () => { this.router.navigate(['/updateordertemp', this.orderTemp[index].hjual_temp_id]); } },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await actionSheet.present();
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

            this.as.deleteOrderTemp(hjual_temp_id).subscribe(
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
    this.orderTempList();
  }

}
