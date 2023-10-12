import { Component, ContentChild, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EmailService } from '../email.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlphaomegaService } from '../alphaomega.service';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  penjual_nama: string = "";
  penjual_tanggalmasuk: any;
  penjual_username: string = "";
  role: string = "";
  penjual_password: string = "";
  penjual_password_lama: string = "";
  penjual_password_baru: string = "";
  penjual_password_baru_repeat: string = "";
  showPassword = [false, false, false];
  passwordToggleIcon = ['eye', 'eye', 'eye'];

  togglePassword(index: number) {
    this.showPassword[index] = !this.showPassword[index];
    if (this.passwordToggleIcon[index] == 'eye') {
      this.passwordToggleIcon[index] = 'eye-off';
    } else {
      this.passwordToggleIcon[index] = 'eye';
    }
  }
  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   sourceType: this.camera.PictureSourceType.CAMERA,
  //   saveToPhotoAlbum: true
  // };
  editProfile() {
    // console.log(this.penjual_username)
    // console.log(this.penjual_password)
    if (this.penjual_password != this.penjual_password_lama) {
      alert("Password lama salah");
    } else if (this.penjual_password_baru == "") {
      alert("Password baru tidak boleh kosong");
    } else if (this.penjual_password_baru != this.penjual_password_baru_repeat) {
      alert("Repeat Password tidak sama");
    } else {
      this.as.editProfile(this.penjual_username, this.penjual_password).subscribe(
        (data) => {
          console.log(data);
          if (data['result'] == 'success') {
            this.storage.remove('penjual_password');
            this.storage.set('penjual_password', this.penjual_password);
            this.refresh();
          }
        }
      );
    }
  }

  refresh() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
  // ambilFoto() {
  //   this.camera.getPicture(this.options).then(
  //     (imageData) => {
  //       let base64Image = 'data:image/jpeg;base64,' + imageData;
  //       this.profileUrl = base64Image;
  //       this.editProfile();
  //     }
  //     , (err) => {
  //       // kalau error
  //     }
  //   );
  // }
  constructor(public storage: Storage, public camera: Camera, public ps: EmailService, public router: Router, public location: Location, public as: AlphaomegaService) { }
  async ngOnInit() {
    this.penjual_nama = await this.storage.get('penjual_nama');
    this.penjual_tanggalmasuk = await this.storage.get('penjual_tanggalmasuk');
    this.penjual_username = await this.storage.get('penjual_username');
    this.role = await this.storage.get('role');
    this.penjual_password = await this.storage.get('penjual_password');
  }

}
