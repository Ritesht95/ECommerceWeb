import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginauthService } from '../loginauth.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  constructor(private _http: Http, private userSession: LoginauthService) {}

  checkLogin(username: string, password: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });

    const data: object = { username: username, password: password };

    return (
      this._http
        .post(environment.apiURL + 'SuperAdmin/CheckLogin.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      oldpassword: oldPassword,
      newpassword: newPassword,
      AdminId: this.userSession.getUserID()
    };

    return (
      this._http
        .post(
          environment.apiURL + 'SuperAdmin/ChangePassword.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  forgotPassword(Username: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { username: Username };

    return (
      this._http
        .post(
          environment.apiURL + 'SuperAdmin/ForgetPassword.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  checkRandomString(RandomString: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { rand: RandomString };

    return (
      this._http
        .post(
          environment.apiURL + 'SuperAdmin/CheckRandomString.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  resetPassword(Username: string, VerificationCode: string, NewPassword: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      username: Username,
      verificationcode: VerificationCode,
      newpassword: NewPassword
    };

    return (
      this._http
        .post(
          environment.apiURL + 'SuperAdmin/ResetPassword.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  postFile(formData: FormData): Observable<boolean> {
    // const headers = new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // });
    // const options = new RequestOptions({ headers: headers });
    const endpoint = environment.apiURL + 'temp.php';
    return this._http
      .post(endpoint, formData)
      .pipe(map( res => {
        return true;
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      }
    ));
  }

  getAdminData(UserID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ID: UserID };
    return this._http.post(environment.apiURL + 'SuperAdmin/ReadInfo.php', data, options).pipe(map(
      res => res.json()
    ));
  }

  setAdminData(UserID: number, Name: string, PhoneNo: string, Email: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      AdminId: UserID,
      AdminName: Name,
      phone_no: PhoneNo,
      email: Email
    };
    return this._http.post(environment.apiURL + '/SuperAdmin/UpdateInfo.php', data, options).pipe(map(
      res => res.json()
    ));
  }

  updateProfileImage(formData: FormData) {

    const endpoint = environment.apiURL + 'SuperAdmin/AdminImage.php';
    return this._http
      .post(endpoint, formData)
      .pipe(map( res => {
        return res.json();
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      }
    ));
  }

  getMailInfo() {
    return this._http.get(environment.apiURL + 'Website/GetMail.php').pipe(map(
      res => res.json()
    ));
  }

  updateMailInfo(Email: string, Password: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { Email: Email, Password: Password, Id: 1 };
    return this._http.post(environment.apiURL + '/Website/MailSetting.php', data, options).pipe(map(
      res => res.json()
    ));
  }
}
