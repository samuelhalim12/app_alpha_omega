import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-modalbasketbuy',
  templateUrl: './modalbasketbuy.component.html',
  styleUrls: ['./modalbasketbuy.component.scss'],
})
export class ModalbasketbuyComponent implements OnInit {

  masterBarangBasketBuy = [];
  thousandSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // constructor(public modalController:ModalController, private platform: Platform) {
  //   this.platform.backButton.subscribeWithPriority(10, () => {
  //     this.dismissModal();
  //   });
  // }
  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  async dismissModal() {
    await this.modalController.dismiss();
  }

}
