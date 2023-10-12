import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modaltemporderitem',
  templateUrl: './modaltemporderitem.component.html',
  styleUrls: ['./modaltemporderitem.component.scss'],
})
export class ModaltemporderitemComponent implements OnInit {

  index: any;
  barang_nama: any;
  barang_deskripsi: any;
  barang_hargajual: any;
  amount: number = 0;
  isEdit: any;
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
    await this.modalController.dismiss(this.amount);
  }
  ngOnInit() {
    console.log(this.amount);
    // this.barang_nama = this.barang_nama.get('barang_nama');
    // this.barang_deskripsi = this.barang_deskripsi.get('barang_deskripsi');
    // this.barang_hargajual = this.barang_hargajual.get('barang_hargajual');
    // this.index = this.index.get('index');
  }

}
