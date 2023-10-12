import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlphaomegaService } from '../alphaomega.service';
import { format } from "date-fns";
@Component({
  selector: 'app-updatemasterbarang',
  templateUrl: './updatemasterbarang.component.html',
  styleUrls: ['./updatemasterbarang.component.scss'],
})
export class UpdatemasterbarangComponent implements OnInit {
  barang_kode: string = "";
  barang_nama: string = "";
  barang_deskripsi: string = "";
  barang_hargajual: number = 0;
  barang_hargabeli: number = 0;
  barang_status: number = 0;
  barang_lastupdate_hjual: string = "";
  barang_lastupdate_hbeli: string = "";
  certainItem = [];
  barang_jumlah = [];
  rincian_stok = [];
  detail_rincian_stok = [];

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService, public alertController: AlertController, public toastController: ToastController) { }
  updateItem() {
    this.ps.updateMasterBarang(this.barang_kode, this.barang_nama, this.barang_deskripsi, this.barang_hargajual, this.barang_hargabeli, this.barang_status, this.barang_lastupdate_hjual, this.barang_lastupdate_hbeli).subscribe(
      (data) => {
        // alert(data['result']);
        if (data['result'] == "Update Success!") {
          this.updateSuccessToast();
          this.router.navigateByUrl('/masterbarang');
        } else {
          alert("Gagal Update Barang!");
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

            this.ps.deleteMasterBarang(barang_kode).subscribe(
              (data) => {
                if (data['result'] == 'success') {
                  this.deleteSuccessToast();
                  this.router.navigate(['/masterbarang']);
                }
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
  async ifTanggalSame(tanggal1: string, tanggal2: string) {
    if (tanggal1 == tanggal2) {
      return true;
    } else {
      return false;
    }
  }
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  ngOnInit() {
    this.barang_kode = this.at.snapshot.params['barang_kode'];
    var barang_kodee = this.at.snapshot.params['barang_kode'];
    this.ps.getCertainItem(barang_kodee).subscribe(
      (data) => {
        this.certainItem = data[0];
        //foreach data
        // this.rincian_stok['tanggal'] = data.tanggal;
        // this.rincian_stok['stok'] = data.stok;
        this.barang_jumlah = data;
        this.barang_jumlah.forEach(element => {
          if(element['tanggal'] != null) {
          this.rincian_stok.push({'tanggal':element['tanggal'], 'stok':element['stok']});
          }
        });
        this.rincian_stok.forEach(element2 => {
          const array2 = [];
          this.barang_jumlah.forEach(element => {
            if(element2['tanggal'] != null && element2['tanggal'] == element['tanggal2']) {
              array2.push({'tanggal2':element['tanggal2'], 'stok2':element['stok2'], 'harga_beli2':element['harga_beli2']});
            }
          });
          this.detail_rincian_stok.push(array2);
        });
        // console.log(this.detail_rincian_stok);

        // console.log(this.rincian_stok);


        // console.log(this.barang_jumlah);
        const dateBeli = new Date(this.certainItem['barang_lastupdate_hbeli']);
        const dateBelii = new Date(dateBeli.getFullYear(), dateBeli.getMonth(), dateBeli.getDate());
        const dateJual = new Date(this.certainItem['barang_lastupdate_hjual']);
        const dateJuall = new Date(dateJual.getFullYear(), dateJual.getMonth(), dateJual.getDate());
        this.certainItem['barang_lastupdate_hbeli'] = format(dateBelii, "dd-MM-yyyy");
        this.certainItem['barang_lastupdate_hjual'] = format(dateJuall, "dd-MM-yyyy");
      }
    );
  }

}
