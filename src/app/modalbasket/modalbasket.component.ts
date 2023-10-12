import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-modalbasket',
  templateUrl: './modalbasket.component.html',
  styleUrls: ['./modalbasket.component.scss'],
})
export class ModalbasketComponent implements OnInit {
  masterBarangBasket = [];
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
