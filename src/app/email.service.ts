import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  inboxList(email_to: string): Observable<any> {
    // return of("ini nanti json products");
    let params = new HttpParams()
      .set('email_to', email_to);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/emaillist.php', params);
  }
  sentList(email_from: string): Observable<any> {
    // return of("ini nanti json products");
    let params = new HttpParams()
      .set('email_from', email_from);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/sentlist.php', params);
  }
  emailDetailList(id: number): Observable<any> {
    let params = new HttpParams()
      .set('idemail', id);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/emaildetaillist.php', params);
  }
  deleteInbox(idemaill: number): Observable<any> {
    let params = new HttpParams()
      .set('idemail', idemaill);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/deleteinbox.php', params);
  }
  sendEmail(subject: string, description: string, email_from: string, email_to:string): Observable<any> {
    let date = formatDate(Date.now(),'yyyy-MM-dd hh:mm:ss','en-US', '+0700');
    let params = new HttpParams()
      .set('subject', subject)
      .set('description', description)
      .set('email_from', email_from)
      .set('email_to', email_to)
      .set('date_email', date);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/sendEmail.php', params);
  }
  addFavorite(id:number,mail_from:string): Observable<any> {
    let params = new HttpParams()
      .set('idemail', id)
      .set('user_email', mail_from);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/favorite.php', params);
  }
  deleteFavorite(id:number): Observable<any> {
    let params = new HttpParams()
      .set('idemail', id)
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/unfavorite.php', params);
  }
  getFavorite(user_email:string): Observable<any> {
    let params = new HttpParams()
      .set('user_email', user_email)
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/favoritelist.php', params);
  }
  replyEmail(idemail:number,reply_from:string,reply_to:string,description:string):Observable<any>{
    let date = formatDate(Date.now(),'yyyy-MM-dd hh:mm:ss','en-US', '+0700');
    let params = new HttpParams()
      .set('idemail', idemail)
      .set('reply_from', reply_from)
      .set('reply_to', reply_to)
      .set('description', description)
      .set('date_reply', date);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/replyEmail.php', params);
  }
  getReply(idemail:number):Observable<any>{
    let params = new HttpParams()
      .set('idemail', idemail);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/getReply.php', params);
  }
  emailSentList(idemail: number): Observable<any> {
    let params = new HttpParams()
      .set('idemail', idemail);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/emailsentlist.php', params);
  }
  getReplySecondUser(idreply:number):Observable<any>{
    let params = new HttpParams()
      .set('idreply', idreply);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/getReplySecondUser.php', params);
  }
  deleteSent(idemail: number): Observable<any> {
    let params = new HttpParams()
      .set('idemail', idemail);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/deletesent.php', params);
  }
  editProfile(id:string,profUrl:string){
    let params = new HttpParams()
      .set('id', id)
      .set('url', profUrl);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/editprofilepicture.php', params);
  }
  moveToSpam(idemail:number) {
    let params = new HttpParams()
      .set('idemail', idemail);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/movetospam.php', params);
  }
  removeFromSpam(idemail:number) {
    let params = new HttpParams()
      .set('idemail', idemail);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/removefromspam.php', params);
  }
  spamList(email_to: string): Observable<any> {
    let params = new HttpParams()
      .set('email_to', email_to);
    return this.https.post('https://ubaya.fun/hybrid/160419077/project_uas/spamlist.php', params);
  }

  constructor(private https: HttpClient) { }
}
