import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modaladdamountbuy',
  templateUrl: './modaladdamountbuy.component.html',
  styleUrls: ['./modaladdamountbuy.component.scss'],
})
export class ModaladdamountbuyComponent implements OnInit {

  index: any;
  barang_nama: any;
  barang_deskripsi: any;
  barang_hargajual: any;
  amount: number = 0;
  isEdit: any;
  harga_beli_baru: any;
  arrData = [];
  constructor(public modalController: ModalController) { }
  async dismissModal() {
    await this.modalController.dismiss("False");
  }
  async minusAmount() {
    if (this.amount > 0) {
      this.amount = this.amount - 1;
    } else {
      this.amount = 0;
    }

  }
  async confirmation() {
    this.arrData['harga_beli_baru'] = this.harga_beli_baru;
    this.arrData['amount'] = this.amount;
    await this.modalController.dismiss(this.arrData);
  }
  ngOnInit() {
    console.log(this.amount);
    // this.barang_nama = this.barang_nama.get('barang_nama');
    // this.barang_deskripsi = this.barang_deskripsi.get('barang_deskripsi');
    // this.barang_hargajual = this.barang_hargajual.get('barang_hargajual');
    // this.index = this.index.get('index');
  }

}
