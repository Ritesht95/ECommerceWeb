import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {
  // private IsServerLoggedIn = false;
  private IsUserLoggedIn = localStorage.getItem('loggedIn');

  // private IsSServerLoggedIn = false;
  private IsSUserLoggedIn = localStorage.getItem('SloggedIn');

  private UserID;
  private Email;
  private UserType;
  private Name;
  private postData;

  private SUserID;
  private SEmail;
  private SName;
  private SpostData;

  constructor(private http: Http, private router: Router) {}

  getUserLoggedIn() {
    this.IsUserLoggedIn = localStorage.getItem('loggedIn');
    return this.IsUserLoggedIn;
  }

  getSUserLoggedIn() {
    this.IsSUserLoggedIn = localStorage.getItem('SloggedIn');
    return this.IsSUserLoggedIn;
  }

  setUserLoggedIn(value: string) {
    this.IsUserLoggedIn = value;
    localStorage.setItem('loggedIn', value);
  }

  setSUserLoggedIn(value: string) {
    this.IsSUserLoggedIn = value;
    localStorage.setItem('SloggedIn', value);
  }

  setValues(UserID: number, Email: string, UserType: string, Name: string) {
    if (UserType === 'seller') {
      this.SUserID = UserID;
      this.SName = Name;
      this.SEmail = Email;
      this.UserType = UserType;
      localStorage.setItem('sessionShopUserID', this.SUserID);
      localStorage.setItem('sessionShopName', this.SName);
      localStorage.setItem('sessionShopEmail', this.SEmail);
      localStorage.setItem('sessionUserType', this.UserType);
    } else {
      this.UserID = UserID;
      this.Name = Name;
      this.Email = Email;
      this.UserType = UserType;
      localStorage.setItem('sessionUserID', this.UserID);
      localStorage.setItem('sessionName', this.Name);
      localStorage.setItem('sessionEmail', this.Email);
      localStorage.setItem('sessionUserType', this.UserType);
  }
}

  getName() {
    this.Name = localStorage.getItem('sessionName');
    return this.Name;
  }

  getUserID() {
    this.UserID = localStorage.getItem('sessionUserID');
    return this.UserID;
  }

  getEmail() {
    this.Email = localStorage.getItem('sessionEmail');
    return this.Email;
  }

  getUserType() {
    this.UserType = localStorage.getItem('sessionUserType');
    return this.UserType;
  }

  getSName() {
    this.SName = localStorage.getItem('sessionShopName');
    return this.SName;
  }

  getSUserID() {
    this.SUserID = localStorage.getItem('sessionShopUserID');
    return this.SUserID;
  }

  getSEmail() {
    this.SEmail = localStorage.getItem('sessionShopEmail');
    return this.SEmail;
  }

  logout(sleep = false) {
    if (this.getUserType() !== 'seller') {
      localStorage.removeItem('sessionUserID');
      localStorage.removeItem('sessionName');
      localStorage.removeItem('sessionEmail');
      localStorage.setItem('loggedIn', 'false');
      this.setUserLoggedIn('false');
      if (sleep === false) {
        this.router.navigate(['login']);
      }
    } else {
      localStorage.removeItem('sessionShopUserID');
      localStorage.removeItem('sessionShopName');
      localStorage.removeItem('sessionShopEmail');
      localStorage.setItem('SloggedIn', 'false');
      this.setSUserLoggedIn('false');
      if (sleep === false) {
        this.router.navigate(['login']);
      }
    }
  }

}
