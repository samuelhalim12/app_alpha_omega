import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUser(user_email: string, username: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('user_email', user_email)
      .set('username', username)
      .set('password', password);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/register.php', params);
  }
  constructor(private https: HttpClient) { }
}
