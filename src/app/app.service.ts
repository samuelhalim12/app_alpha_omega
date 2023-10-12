import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  checkLogin(user_email: string, user_password: string): Observable<any> {
    let params = new HttpParams()
      .set('username', user_email)
      .set('password', user_password);
    return this.https.post('http://192.168.100.3/ws_alpha_omega/login.php', params);
  }

  constructor(private https: HttpClient) { }
}
