import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AlphaomegaService {
  masterBarangList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/masterbarang.php');
  }
  deleteMasterBarang(barang_kode: string): Observable<any> {
    let params = new HttpParams()
      .set('barang_kode', barang_kode);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/deletemasterbarang.php', params);
  }
  getCertainItem(barang_kode:string): Observable<any> {
    let params = new HttpParams()
      .set('barang_kode', barang_kode);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailmasterbarang.php', params);
  }
  updateMasterBarang(barang_kode:string, barang_nama: string, barang_deskripsi: string, barang_hargajual: number, barang_hargabeli: number, barang_status: number, barang_lastupdate_hjual: string,barang_lastupdate_hbeli:string): Observable<any> {
    let params = new HttpParams()
      .set('barang_kode', barang_kode)
      .set('barang_nama', barang_nama)
      .set('barang_deskripsi', barang_deskripsi)
      .set('barang_hargajual', barang_hargajual)
      .set('barang_hargabeli', barang_hargabeli)
      .set('barang_status', barang_status)
      .set('barang_lastupdate_hjual', barang_lastupdate_hjual)
      .set('barang_lastupdate_hbeli', barang_lastupdate_hbeli);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/updatemasterbarang.php', params);
  }
  searchMasterBarang(barang_nama: string): Observable<any> {
    let params = new HttpParams()
      .set('barang_nama', barang_nama);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/searchmasterbarang.php', params);
  }
  masterPenjualList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/masterpenjual.php');
  }
  deleteMasterPenjual(penjual_id: string): Observable<any> {
    let params = new HttpParams()
      .set('penjual_id', penjual_id);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/deletemasterpenjual.php', params);
  }
  getCertainSeller(penjual_id:string): Observable<any> {
    let params = new HttpParams()
      .set('penjual_id', penjual_id);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailmasterpenjual.php', params);
  }
  updateMasterPenjual(penjual_id:string, penjual_nama: string, penjual_username: string, penjual_password: string, role: string): Observable<any> {
    let params = new HttpParams()
      .set('penjual_id', penjual_id)
      .set('penjual_nama', penjual_nama)
      .set('penjual_username', penjual_username)
      .set('penjual_password', penjual_password)
      .set('role', role);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/updatemasterpenjual.php', params);
  }
  searchMasterPenjual(penjual_nama: string): Observable<any> {
    let params = new HttpParams()
      .set('penjual_nama', penjual_nama);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/searchmasterpenjual.php', params);
  }
  masterSupplierList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/mastersupplier.php');
  }
  deleteMasterSupplier(supplier_id: string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_id', supplier_id);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/deletemastersupplier.php', params);
  }
  getCertainSupplier(supplier_id:string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_id', supplier_id);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailmastersupplier.php', params);
  }
  updateMasterSupplier(supplier_id:string, supplier_nama: string, supplier_alamat: string, supplier_telepon: string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_id', supplier_id)
      .set('supplier_nama', supplier_nama)
      .set('supplier_alamat', supplier_alamat)
      .set('supplier_telepon', supplier_telepon)
    return this.https.post('http://192.168.100.3/ws_alpha_omega/updatemastersupplier.php', params);
  }
  searchMasterSupplier(supplier_nama: string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_nama', supplier_nama);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/searchmastersupplier.php', params);
  }
  insertMasterBarang(barang_nama: string, barang_deskripsi: string, barang_hargajual: number, barang_hargabeli: number): Observable<any> {
    let params = new HttpParams()
      .set('barang_nama', barang_nama)
      .set('barang_deskripsi', barang_deskripsi)
      .set('barang_hargajual', barang_hargajual)
      .set('barang_hargabeli', barang_hargabeli)
    return this.https.post('http://192.168.100.3/ws_alpha_omega/insertnewbarang.php', params);
  }
  insertMasterPenjual(penjual_nama: string, penjual_username: string, penjual_password: string, role: string): Observable<any> {
    let params = new HttpParams()
      .set('penjual_nama', penjual_nama)
      .set('penjual_username', penjual_username)
      .set('penjual_password', penjual_password)
      .set('role', role);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/insertnewpenjual.php', params);
  }
  insertMasterSupplier(supplier_nama: string, supplier_alamat: string, supplier_telepon: string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_nama', supplier_nama)
      .set('supplier_alamat', supplier_alamat)
      .set('supplier_telepon', supplier_telepon)
    return this.https.post('http://192.168.100.3/ws_alpha_omega/insertnewsupplier.php', params);
  }
  orderTempList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/masterordertemp.php');
  }
  deleteOrderTemp(hjual_temp_id: number): Observable<any> {
    let params = new HttpParams()
      .set('hjual_temp_id', hjual_temp_id);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/deleteordertemp.php', params);
  }
  getCertainOrderTemp(hjual_temp_id:number): Observable<any> {
    let params = new HttpParams()
      .set('hjual_temp_id', hjual_temp_id);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailordertemp.php', params);
  }
  updateOrderTemp(penjual_id: string, hjual_temp_pembeli: string, hjual_temp_jumlah: number, barang_kode: string[], djual_temp_banyak: number[], hjual_temp_id: number){
    let params = new HttpParams()
      .set('penjual_id', penjual_id)
      .set('hjual_temp_pembeli', hjual_temp_pembeli)
      .set('hjual_temp_jumlah', hjual_temp_jumlah)
      .set('barang_kode', barang_kode.join(','))
      .set('djual_temp_banyak', djual_temp_banyak.join(','))
      .set('hjual_temp_id', hjual_temp_id);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/updateordertemp.php', params);
  }
  searchOrderTemp(hjual_temp_pembeli: string): Observable<any> {
    let params = new HttpParams()
      .set('hjual_temp_pembeli', hjual_temp_pembeli);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/searchordertemp.php', params);
  }
  insertOrderTemp(supplier_nama: string, supplier_alamat: string, supplier_telepon: string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_nama', supplier_nama)
      .set('supplier_alamat', supplier_alamat)
      .set('supplier_telepon', supplier_telepon)
    return this.https.post('http://192.168.100.3/ws_alpha_omega/insertnewordertemp.php', params);
  }
  checkoutOrderTemp(penjual_id: string, hjual_temp_pembeli: string, hjual_temp_jumlah: number, barang_kode: string[], djual_temp_banyak: number[]): Observable<any> {
    let params = new HttpParams()
      .set('penjual_id', penjual_id)
      .set('hjual_temp_pembeli', hjual_temp_pembeli)
      .set('hjual_temp_jumlah', hjual_temp_jumlah)
      .set('barang_kode', barang_kode.join(','))
      .set('djual_temp_banyak', djual_temp_banyak.join(','))

    return this.https.post('http://192.168.100.3/ws_alpha_omega/checkoutordertemp.php', params);
  }
  historyJualList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/historyjual.php');
  }
  searchHistoryJual(hjual_pembeli:string): Observable<any> {
    let params = new HttpParams()
      .set('hjual_pembeli', hjual_pembeli);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/searchhistoryjual.php', params);
  }
  getCertainHjual(hjual_id:string): Observable<any> {
    let params = new HttpParams()
      .set('hjual_id', hjual_id);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailhistoryjual.php', params);
  }
  historyBeliList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/historybeli.php');
  }
  searchHistoryBeli(supplier_nama:string): Observable<any> {
    let params = new HttpParams()
      .set('supplier_nama', supplier_nama);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/searchhistorybeli.php', params);
  }
  getCertainHbeli(hbeli_id:string): Observable<any> {
    let params = new HttpParams()
      .set('hbeli_id', hbeli_id);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailhistorybeli.php', params);
  }
  reportList(bulan:number,tahun:number): Observable<any> {
    let params = new HttpParams()
      .set('bulan', bulan)
      .set('tahun', tahun);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/reportfiltered.php', params);
  }
  editProfile(penjual_username: string, penjual_password:string): Observable<any> {
    let params = new HttpParams()
      .set('penjual_username', penjual_username)
      .set('penjual_password', penjual_password);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/editprofile.php', params);
  }
  filterHistoryJual(startDate:string,endDate:string): Observable<any>  {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/filterhistoryjual.php', params);
  }
  filterHistoryBeli(startDate:string,endDate:string): Observable<any>  {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/filterhistorybeli.php',params);
  }
  getReportList(): Observable<any> {
    return this.https.get('http://192.168.100.3/ws_alpha_omega/report.php');
  }
  filterReport(startMonth:number,startYear:number,endMonth:number,endYear:number): Observable<any>  {
    let params = new HttpParams()
      .set('startMonth', startMonth)
      .set('startYear', startYear)
      .set('endMonth', endMonth)
      .set('endYear', endYear);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/reportfiltered.php', params);
  }
  checkoutBuy(supplier_id: string, penjual_id: string, hbeli_total: number, nominalBayar : number, metodePembayaran:string,hbeli_kembalian:number, barang_kode: string[], dbeli_banyak: number[],harga_beli:number[],barang_stok:number[]): Observable<any> {
    let params = new HttpParams()
      .set('supplier_id', supplier_id)
      .set('penjual_id', penjual_id)
      .set('hbeli_total', hbeli_total)
      .set('nominalBayar', nominalBayar)
      .set('metodePembayaran', metodePembayaran)
      .set('hbeli_kembalian', hbeli_kembalian)
      .set('barang_kode', barang_kode.join(','))
      .set('dbeli_banyak', dbeli_banyak.join(','))
      .set('harga_beli', harga_beli.join(','))
      .set('barang_stok', barang_stok.join(','))

    return this.https.post('http://192.168.100.3/ws_alpha_omega/checkoutbuy.php', params);
  }
  getDetailReportList(bulan:number,tahun:number): Observable<any> {
    let params = new HttpParams()
      .set('bulan', bulan)
      .set('tahun', tahun);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/detailreport.php', params);
  }
  filterDetailReport(startDay:number,endDay:number,bulan:number,tahun:number): Observable<any>  {
    let params = new HttpParams()
      .set('startDay', startDay)
      .set('endDay', endDay)
      .set('bulan', bulan)
      .set('tahun', tahun);
      return this.https.post('http://192.168.100.3/ws_alpha_omega/detailreportfiltered.php', params);
  }
  constructor(private https: HttpClient) { }
}
