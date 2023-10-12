import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  constructor(public storage: Storage, public router: Router) { }
  role: any;
  isAdmin = false;
  isPegawai = false;
  toDraftOrder() {
    this.router.navigateByUrl('/order', { skipLocationChange: true }).then(() => {
      // this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  async ngOnInit() {
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
  }

}
