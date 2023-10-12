import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
// import { ProductModel } from './productmodel';
// import { Storage } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';
import { AppService } from './app.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username = "";
  user_id = "";
  penjual_username = "";
  penjual_password = "";
  login_error = "";
  role="";
  isAdmin = false;
  penjual_nama : any;
  penjual_tanggalmasuk :any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  // activePage: any;

  // login() {
  //   if (this.penjual_password == '1234') {
  //     this.user_id = this.penjual_username;
  //     this.storage.set('user_id', this.user_id);
  //   }
  //   else {
  //     this.login_error = "username atau password salah";
  //   }
  // }

  constructor(private storage: Storage, public as: AppService,public platform:Platform, public router:Router,
    public location :PlatformLocation, public toastController: ToastController, public navCtrl:NavController) {
    // this.activePage = 'home';
    // this.location.onPopState(async()=>{
    //   this.location.back();
    //   // this.router.navigate(['/']);
    //   // console.log('sukses pop')
    // })

    this.platform.backButton.subscribeWithPriority(5, () => {
      //navigate back

      // if(this.router.url != '/home') {
      //   this.location.back();
      // } else {
      //   this.exitFromApp();
      // }

      if(this.router.url == '/masterbarang' || this.router.url == '/masterpenjual' || this.router.url == '/mastersupplier' ||
      this.router.url == '/order' || this.router.url == '/history' || this.router.url == '/profile' || this.router.url == '/report'){
        this.router.navigate(['/home'], { replaceUrl: true });
        // console.log('sukses back');
      } else if(this.router.url.includes('/updatemasterbarang/') || this.router.url.includes('/detailmasterbarang/') || this.router.url == '/insertnewbarang'){
        this.router.navigate(['/masterbarang'], { replaceUrl: true });
      } else if(this.router.url.includes('/updatemastersupplier/') || this.router.url == '/insertnewsupplier'){
        this.router.navigate(['/mastersupplier'], { replaceUrl: true });
      } else if(this.router.url.includes('/updatemasterpenjual/') || this.router.url.includes('/detailmasterpenjual/') || this.router.url == '/insertnewpenjual'){
        this.router.navigate(['/masterpenjual'], { replaceUrl: true });
      } else if(this.router.url == '/insertnewordertemp' || this.router.url.includes('/detailordertemp/')){
        this.router.navigate(['/order'], { replaceUrl: true });
      } else if(this.router.url.includes('/checkoutdraftorder')) {
        this.router.navigate(['/insertnewordertemp'], { replaceUrl: true });
      } else if(this.router.url == '/historybeli' || this.router.url == '/historyjual'){
        this.router.navigate(['/history'], { replaceUrl: true });
      } else if(this.router.url.includes('/detailhistoryjual/')) {
        this.router.navigate(['/historyjual'], { replaceUrl: true });
      } else if(this.router.url.includes('/detailhistorybeli/')) {
        this.router.navigate(['/historybeli'], { replaceUrl: true });
      } else if(this.router.url.includes('/insertbuy')) {
        this.router.navigate(['/historybeli'], { replaceUrl: true });
      } else if(this.router.url.includes('/checkoutbuy')) {
        this.router.navigate(['/insertbuy'], { replaceUrl: true });
      } else if(this.router.url.includes('/detailreport/')) {
        this.router.navigate(['/report'], { replaceUrl: true });
      }else if(this.router.url == '/home'){
        // navigator['app'].exitApp();
        this.exitFromApp()
      }
    });
  }
  async exitFromApp(){
    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
      // this.platform.exitApp(); // Exit from app
      navigator['app'].exitApp(); // work in ionic 4
    }
    const toast = await this.toastController.create({
      message: 'Press back again to exit App.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    // console.log(JSON.stringify(toast));
    this.lastTimeBackPress = new Date().getTime();
    // if (!this.routerOutlet.canGoBack()) {
    //   App.exitApp();
    // }
  }
  async loginSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Login Success!',
      duration: 1500
    });
    toast.present();
  }
  login() {
    this.penjual_password = Md5.hashStr(this.penjual_password);
    this.as.checkLogin(this.penjual_username, this.penjual_password).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.loginSuccessToast();
          this.user_id = data['data'][0]['penjual_username'];
          this.penjual_username = data['data'][0]['penjual_username'];
          this.role = data['data'][0]['role'];
          this.penjual_tanggalmasuk = data['data'][0]['formatted_tanggalmasuk'];
          this.penjual_nama = data['data'][0]['penjual_nama'];
          this.penjual_password = data['data'][0]['penjual_password'];
          if(this.role == 'Admin'){
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          this.storage.set('role', this.role);
          this.storage.set('user_id', this.penjual_username);
          this.storage.set('penjual_username', this.penjual_username);
          this.storage.set('penjual_nama', this.penjual_nama);
          this.storage.set('penjual_tanggalmasuk', this.penjual_tanggalmasuk);
          this.storage.set('penjual_id', data['data'][0]['penjual_id']);
          this.storage.set('penjual_password', this.penjual_password);
          this.login_error = "";
        } else {
          this.login_error = "username atau password salah";
        }
      }
    );
  }


  logout() {
    this.storage.remove('user_id');
    this.storage.remove('penjual_username');
    this.storage.remove('masterBarangBasket');
    this.storage.remove('masterBarang');
    this.storage.remove('namaPembeli');
    this.storage.remove('penjual_id');
    this.storage.remove('role');
    this.storage.remove('penjual_tanggalmasuk');
    this.storage.remove('penjual_username');
    this.storage.remove('penjual_nama');
    this.storage.remove('penjual_password');
    this.user_id = "";
    this.penjual_username = "";
    this.penjual_password = "";
    this.login_error = "";
  }
  // openPage(page) {
  //   this.activePage = page;
  // }
  async ngOnInit() {
    await this.storage.create();
    this.user_id = await this.storage.get('user_id');
    this.penjual_username = await this.storage.get('penjual_username');
    this.role = await this.storage.get('role');
    if (this.role != '') {
      if (this.role == 'Admin') {
        this.isAdmin = true;
      }
      else if (this.role == 'Pegawai') {
        this.isAdmin = false;
      }
    }
    // this.login()
  }
}
