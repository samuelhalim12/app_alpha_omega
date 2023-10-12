import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlphaomegaService } from '../alphaomega.service';

@Component({
  selector: 'app-insertnewsupplier',
  templateUrl: './insertnewsupplier.component.html',
  styleUrls: ['./insertnewsupplier.component.scss'],
})
export class InsertnewsupplierComponent implements OnInit {


  supplier_nama: string = "";
  supplier_alamat: string = "";
  supplier_telepon: string = "";

  constructor(public at: ActivatedRoute, public router: Router, public ps: AlphaomegaService) { }
  insertSupplier() {
    this.ps.insertMasterSupplier(this.supplier_nama, this.supplier_alamat, this.supplier_telepon).subscribe(
      (data) => {
        // alert(data['result']);
        this.router.navigateByUrl('/mastersupplier');
      }
    );
  }
  ngOnInit() {
  }

}
