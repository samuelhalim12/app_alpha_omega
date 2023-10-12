import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  role: any;
  isAdmin = false;
  isPegawai = false;

  constructor(public storage: Storage, public router: Router) { }
  toDraftOrder() {
    this.router.navigateByUrl('/order', { skipLocationChange: true }).then(() => {
      // this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  async ngOnInit() {
    this.role = await this.storage.get('role');
    // console.log(this.role == 'Admin');
    if (this.role != '') {
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
    // console.log(this.role);
  }
}
