import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlphaomegaService } from '../alphaomega.service';
import { ModalfilterdetailreportComponent } from '../modalfilterdetailreport/modalfilterdetailreport.component';
import { ModalfilterreportComponent } from '../modalfilterreport/modalfilterreport.component';

@Component({
  selector: 'app-detailreport',
  templateUrl: './detailreport.component.html',
  styleUrls: ['./detailreport.component.scss'],
})
export class DetailreportComponent implements OnInit {

  constructor(public at: ActivatedRoute, public location: Location, public router: Router, public alertController: AlertController,
    public toastController: ToastController, public as: AlphaomegaService, public storage: Storage, public modalController: ModalController) { }
  masterSupplier = [];
  searchText: string = "";
  role: any;
  isAdmin = false;
  isPegawai = false;
  bulan_tahun = [];
  bulan: number;
  tahun: number;
  pendapatan = [];
  biaya = [];
  selisih = [];
  tipeProfit = [];

  // totalKeuntungan: number = 0;
  currentTime = new Date();
  // bulan: number = this.currentTime.getMonth() + 1;
  // tahun: number = this.currentTime.getFullYear();
  profitType = [];
  // startDate: any;
  // endDate: any;

  // compareFn(e1: number, e2: number): boolean {
  //   return e1 && e2 ? e1 == e2 : e1 == e2;
  // }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  toDraftOrder() {
    this.router.navigateByUrl('/order', { skipLocationChange: true }).then(() => {
      // this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  // reportList2() {
  //   this.totalKeuntungan = 0;
  //   this.as.reportList(this.bulan, this.tahun).subscribe(
  //     (data) => {
  //       this.masterSupplier = data;
  //       this.masterSupplier.forEach(element => {
  //         if (element.harga_jual != null && element.harga_beli != null) {
  //           this.totalKeuntungan += (element.harga_jual - element.harga_beli) * element.djual_banyak;
  //         }
  //         // console.log(element.harga_jual);
  //         // console.log(element.harga_beli);
  //         // console.log(element.djual_banyak);
  //       }
  //       );
  //     });
  // }

  reportList(bulan: number, tahun: number) {
    this.as.getDetailReportList(bulan, tahun).subscribe(
      (data) => {
        this.masterSupplier = data;
        // console.log(this.masterSupplier);

        //loop through data
        this.masterSupplier.forEach(element => {
          var index = this.masterSupplier.indexOf(element);
          element['djual_banyak'] = parseInt(element['djual_banyak']);

          const pndptn = parseInt(element['djual_banyak']) * element['harga_jual']
          const biayaa = parseInt(element['djual_banyak']) * element['harga_beli']
          const selisihh = Math.abs(pndptn - biayaa)
          this.pendapatan.push(pndptn);
          this.biaya.push(biayaa);
          // this.selisih.push((Math.abs(parseInt(element['djual_banyak']) * element['harga_jual'] - parseInt(element['djual_banyak']) * element['harga_beli'])));
          this.selisih.push(selisihh);
          if (pndptn > biayaa) {
            this.tipeProfit.push('Untung');
          } else {
            this.tipeProfit.push('Rugi');
          }
          // console.log(this.pendapatan);
          // console.log(this.biaya);
          // console.log(this.selisih);
          this.bulan_tahun.push(element['hari'] + "-" + element['bulan'] + "-" + element['tahun']);
          console.log(this.bulan_tahun);
          if (element.untung >= 0) {
            this.profitType.push('Untung');
          } else {
            this.profitType.push('Rugi');
            element.untung *= -1;
          }
        });
      });
  }
  async openModalFilter() {
    // console.log(index);
    // console.log(this.masterBarangPagination);
    const modal = await this.modalController.create({
      component: ModalfilterdetailreportComponent,
      componentProps: {

      }
    });
    modal.onDidDismiss()
      .then(data1 => {
        // format data1['data'] dd-mm-yyyy format
        if (!data1['data']) {
          console.log("Date is missing")
          return
        }
        const startDate1 = new Date(data1['data']);
        // const startDate = new Date(startDate1.getFullYear(), startDate1.getMonth());
        const endDate1 = new Date(data1['role']);
        // const endDate = new Date(endDate1.getFullYear(), endDate1.getMonth());
        // console.log(format(startDate, "yyyy-MM-dd"))
        // console.log(format(endDate, "yyyy-MM-dd"))
        // console.log(format(new Date(data1['data']), "dd-MM-yyyy"));
        // console.log(format(new Date(data1['role']), "dd-MM-yyyy"));
        // console.log(startDate1.getDate(),endDate1.getDate(),this.bulan,this.tahun);
        this.as.filterDetailReport(startDate1.getDate(), endDate1.getDate(), this.bulan, this.tahun).subscribe(
          (data) => {
            this.masterSupplier = data;
          }
        );


        // this.filteredData = this.masterBarang.filter(item => {
        //   return isWithinRange(new Date(item.formatted_hjual_tanggal, startDate, endDate));
        // })
      }
      );
    await modal.present();
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

  // async deleteSuccessToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Delete Success!',
  //     duration: 1500
  //   });
  //   toast.present();
  // }
  // async handleButtonPress(index: number) {
  //   const actionSheet = await actionSheetController.create({
  //     header: 'Action',
  //     buttons: [
  //       { text: 'Delete', role: 'destructive', handler: () => { this.deleteMasterSupplier(this.masterSupplier[index].supplier_id); } },
  //       //Update button go to update page
  //       { text: 'Update', handler: () => { this.router.navigate(['/updatemastersupplier', this.masterSupplier[index].supplier_id]); } },
  //       { text: 'Cancel', role: 'cancel' },
  //     ],
  //   });
  //   await actionSheet.present();
  // }

  // async deleteMasterSupplier(supplier_id: string) {
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

  //           this.as.deleteMasterSupplier(supplier_id).subscribe(
  //             (data) => {
  //               if (data['result'] == 'success') {
  //                 this.deleteSuccessToast();
  //                 this.refresh();
  //               }
  //             }
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  async ngOnInit() {

    //get parameter
    const bulan_tahun = this.at.snapshot.params['bulan_tahun'].split("-");
    this.bulan = bulan_tahun[0];
    this.tahun = bulan_tahun[1];
    this.reportList(this.bulan, this.tahun);

    this.role = await this.storage.get('role');
    if (this.role == 'Admin') {
      this.isAdmin = true;
      this.isPegawai = false;
    }
    else if (this.role == 'Pegawai') {
      this.isPegawai = true;
      this.isAdmin = false;
      this.toDraftOrder();
    }
    // console.log(this.bulan);
  }

}
