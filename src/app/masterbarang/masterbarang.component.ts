import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { actionSheetController, alertController } from '@ionic/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlphaomegaService } from '../alphaomega.service';
@Component({
  selector: 'app-masterbarang',
  templateUrl: './masterbarang.component.html',
  styleUrls: ['./masterbarang.component.scss'],
})
export class MasterbarangComponent implements OnInit {

  constructor(public location: Location, public router: Router, public alertController: AlertController,
    public toastController: ToastController, public as: AlphaomegaService, public storage: Storage) { }
  masterBarang = [];
  masterBarangPagination = [];
  searchText: string = "";
  page: number = 1;
  max: number = 0;
  startNum: number = 0;
  endNum: number = 24;

  async updateItem(barang_kode: string) {
    this.router.navigate(['/updatemasterbarang', barang_kode]);
  }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  masterBarangList(event?) {
    this.as.masterBarangList().subscribe(
      (data) => {
        this.masterBarang = data;
        // console.log(this.masterBarang.slice(this.startNum, this.endNum));
        this.masterBarangPagination = this.masterBarangPagination.concat(this.masterBarang.slice(this.startNum, this.endNum));
        this.startNum = this.endNum;
        if (this.endNum + 24 > this.masterBarang.length) {
          this.endNum = this.masterBarang.length;
        } else {
          this.endNum = this.endNum + 24;
        }
        this.max = Math.ceil(this.masterBarang.length / 25);

        // console.log(this.max);
        if (event) {
          event.target.complete();
        }
      }
    );
  }
  loadProductMore(event) {
    this.page++;
    this.masterBarangList(event);
    if (this.page == this.max) {
      event.target.disabled = true;
    }
  }
  async searchFunction() {
    console.log(this.searchText);
    // console.log(event);
    this.as.searchMasterBarang(this.searchText).subscribe(
      (data) => {
        this.masterBarang = data;
        this.masterBarangPagination = data;
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
        { text: 'Delete', role: 'destructive', handler: () => { this.deleteMasterBarang(this.masterBarang[index].barang_kode); } },
        //Update button go to update page
        { text: 'Update', handler: () => { this.router.navigate(['/updatemasterbarang', this.masterBarang[index].barang_kode]); } },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
    await actionSheet.present();
  }

  async deleteMasterBarang(barang_kode: string) {
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

            this.as.deleteMasterBarang(barang_kode).subscribe(
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
  doRefresh(event) {
    setTimeout(() => {
      this.refresh();
      event.target.complete();
    }, 500);
  }

  async ngOnInit() {
    this.masterBarangList();
  }

}
