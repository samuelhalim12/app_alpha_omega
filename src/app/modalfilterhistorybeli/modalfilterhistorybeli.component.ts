import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalfilterhistorybeli',
  templateUrl: './modalfilterhistorybeli.component.html',
  styleUrls: ['./modalfilterhistorybeli.component.scss'],
})
export class ModalfilterhistorybeliComponent implements OnInit {
  startDate: any;
  endDate: any;
  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  async dismissModal() {
    await this.modalController.dismiss("False");
  }
  async confirmation() {
    await this.modalController.dismiss(this.startDate, this.endDate);
  }
}
