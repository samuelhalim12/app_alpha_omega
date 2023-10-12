import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlphaomegaService } from '../alphaomega.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-insertnewbarang',
  templateUrl: './insertnewbarang.component.html',
  styleUrls: ['./insertnewbarang.component.scss'],
})
export class InsertnewbarangComponent implements OnInit {

  barang_nama: string = "";
  barang_deskripsi: string = "";
  barang_hargajual: number = 0;
  barang_hargabeli: number = 0;

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService, public toastController: ToastController) { }
  async insertSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Insert Data Barang Success!',
      duration: 1500
    });
    toast.present();
  }
  insertItem() {
    if (this.barang_nama != "" && this.barang_hargajual >= 0 && this.barang_hargabeli >= 0) {
      this.ps.insertMasterBarang(this.barang_nama, this.barang_deskripsi, this.barang_hargajual, this.barang_hargabeli).subscribe(
        (data) => {
          // alert(data['result']);
          this.insertSuccessToast();
          this.router.navigateByUrl('/masterbarang');
        }
      );
    } else if (this.barang_nama == "") {
      alert("Masukkan nama barang")
    } else if (this.barang_hargajual < 0) {
      alert("Masukkan harga jual barang minimal 0")
    } else if (this.barang_hargabeli < 0) {
      alert("Masukkan harga beli barang minimal 0")
    }
  }
  ngOnInit() {
  }

}
