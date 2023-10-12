import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  // username = "Samuel Halim";
  // judul = "Ionic-Angular Week09";
  // user_id = "";
  register_username = "";
  register_user_email = "";
  register_passwd = "";
  register_error = "";

  // login() {
  //   if (this.login_passwd == '1234') {
  //     this.user_id = this.login_user;
  //     this.storage.set('user_id', this.user_id);
  //   }
  //   else {
  //     this.login_error = "username atau password salah";
  //   }
  // }

  constructor(private storage: Storage, public as: RegisterService, private route: Router) { }
  register() {
    this.as.registerUser(this.register_user_email, this.register_username, this.register_passwd).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          // this.user_id = this.login_user;
          // this.storage.set('user_id', this.user_id);
          // console.log(data['result']);
          this.register_error = "";
          this.storage.remove('user_id');
          this.route.navigate(['/home']);
          window.location.reload();
        } else {
          // console.log(data['result']);
          this.register_error = "email sudah dipakai";
        }
      }
    );
  }
  async ngOnInit() {
    // await this.storage.create();
    // this.user_id = await this.storage.get('user_id');
    // this.login()
  }

}
