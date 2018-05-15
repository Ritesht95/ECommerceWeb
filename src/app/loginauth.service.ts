import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginauthService {

  private IsServerLoggedIn = false;
  private IsUserLoggedIn = JSON.parse(localStorage.getItem('loggedIn' || 'false'));
  private UserID;
  private Email;
  private UserType;
  private Name;
  private postData;

  constructor(private http: Http) { }

  setUserLoggedIn(value: boolean) {
    this.IsUserLoggedIn = value;
    localStorage.setItem('loggedIn', value.toString());
  }

  setValues(UserID: number, Email: string, UserType: string, Name: string) {
    this.UserID = UserID;
    this.Name = Name;
    this.Email = Email;
    this.UserType = UserType;
    localStorage.setItem('sessionUserID', this.UserID );
    localStorage.setItem('sessionName', this.Name );
    localStorage.setItem('sessionEmail', this.Email );
    localStorage.setItem('sessionUserType', this.UserType );
  }

  getName() {
    return this.Name;
  }

  getUserID() {
    return this.UserID;
  }

  getEmail() {
    return this.Email;
  }

  getUserType() {
    return this.UserType;
  }

  getUserLoggedIn() {
    return this.IsUserLoggedIn;
  }

  getServerLoggedIn(Email: string, Type: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const qry: string = environment.apiURL + 'Config/Session.php?' + 'Id=' + Email + '&type=' + Type + '&status=0&operation=get';
    return (this.http.get(qry));
  }

  setServerLogout(Email: string, Type: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const qry: string = environment.apiURL + 'Config/Session.php?' + 'Id=' + Email + '&type=' + Type + '&status=0&operation=set';
    return (this.http.get(qry));
  }

}
