import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {

  private IsUserLoggedIn;
  private UserID;
  private Email;
  private UserType;
  private Name;

  constructor() { }

  setUserLoggedIn(value: boolean) {
    this.IsUserLoggedIn = value;
  }

  setValues(UserID: number, Email: string, UserType: string, Name: string) {
    this.UserID = UserID;
    this.Name = Name;
    this.Email = Email;
    this.UserType = UserType;
  }

  getName() {
    return this.Name;
  }

  getUserID() {
    return this.UserID;
  }

  getUserLoggedIn() {
    return this.IsUserLoggedIn;
  }
}
