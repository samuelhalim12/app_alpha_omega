import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlphaomegaService } from '../alphaomega.service';
import { Md5 } from 'ts-md5/dist/md5'

@Component({
  selector: 'app-insertnewpenjual',
  templateUrl: './insertnewpenjual.component.html',
  styleUrls: ['./insertnewpenjual.component.scss'],
})
export class InsertnewpenjualComponent implements OnInit {

  penjual_nama: string = "";
  penjual_username: string = "";
  penjual_password: string = "";
  penjual_repeat_password: string = "";
  role: string = "";

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService) { }
  insertSeller() {
    if (this.penjual_password != this.penjual_repeat_password) {
      alert("Password belum sama");
    } else {
      this.penjual_password = Md5.hashStr(this.penjual_password);

      this.ps.insertMasterPenjual(this.penjual_nama, this.penjual_username, this.penjual_password, this.role).subscribe(
        (data) => {
          // alert(data['result']);
          this.router.navigateByUrl('/masterpenjual');
        }
      );
    }
  }
  ngOnInit() {
  }

}
