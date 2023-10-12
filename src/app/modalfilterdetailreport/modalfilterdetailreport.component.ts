import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalfilterdetailreport',
  templateUrl: './modalfilterdetailreport.component.html',
  styleUrls: ['./modalfilterdetailreport.component.scss'],
})
export class ModalfilterdetailreportComponent implements OnInit {

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
