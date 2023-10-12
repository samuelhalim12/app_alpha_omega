import { Injectable } from '@angular/core';
import { ProductModel } from './productmodel';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsPhone: ProductModel[] = [
    new ProductModel('Realme 5', 1800000, 0.1, 'realme_5.jpg', 'Realme 5 berbekal layar mini-drop fullscreen LCD 6.5", ditenagai Snapdragon 665, quad kamera belakang perangkat dan baterai 5000 mAh, Micro USB port.'),
    new ProductModel('OPPO A1', 1400000, 0.15, 'oppo_a1.jpg', 'OPPO A1 untuk kelas menengah dengan fitur Face recognition, layar 5.7 inci 18:9, RAM 4GB, memori internal 64GB dan baterai 3,180 mAh. Hadir dalam varian warna biru, merah dan putih.'),
    new ProductModel('Samsung Galaxy S10', 1200000, 0, 'samsunggalaxynote20.jpg', 'Samsung Galaxy A10 berlayar HD+ Infinity-V 6.2" dengan chipset Exynos 7884, kamera depan 5MP, kamera belakang 13MP, baterai berkapasitas 3400 mAh.'),
    new ProductModel('Redmi Note 8', 1900000, 0.2, 'redmi_note_10.jpg', 'Xiaomi Redmi Note 8 dibekali layar FHD+ 6.3 inci ditenagai prosesor Qualcomm Snapdragon 665 dipadukan Adreno 610 GPU, dan quad-camera 48MP + 8MP + 2MP + 2MP.'),
    new ProductModel('Iphone X', 6300000, 0.25, 'iphone_x.jpg', 'Apple iPhone X berlayar super retina 5.8" dengan design tanpa tombol Home, dibekali teknologi sekuriti terbaru Face ID membantu mengunlock, melakukan pembayaran hanya dengan menggunakan wajah Anda.')
  ];
  productList(): Observable<any> {
    // return of("ini nanti json products");
    return this.https.get('https://ubaya.fun/hybrid/160419077/week13_api/products.php');
  }
  productDetailList(id: number): Observable<any> {
    let params = new HttpParams()
      .set('id', id);
    return this.https.post('https://ubaya.fun/hybrid/160419077/week13_api/productdetail.php', params);
  }
  newProduct(name: string, price: number, disc: number, url: string, desc: string): Observable<any> {
    let params = new HttpParams()
      .set('name', name)
      .set('price', price)
      .set('disc', disc)
      .set('url', url)
      .set('desc', desc);
    return this.https.post('https://ubaya.fun/hybrid/160419077/week13_api/addproduct.php', params);
  }
  constructor(private https: HttpClient) { }
}
