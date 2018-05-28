import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private _http: Http, private userSession: LoginauthService) { }

  setSignUp(SName: string, SType: string, PhoneNo: string, Email: string, OName: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ShopName: SName, ShopType: SType, PhoneNo: PhoneNo, Email: Email, OwnerName: OName };

    return (
      this._http
        .post(
          environment.apiURL + 'Shop/Signup.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  checkLogin(Username: string, Password: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers : headers });

    const data: object = { username: Username, password: Password };

    return (
      this._http
        .post(environment.apiURL + 'Shop/CheckLogin.php', data, options)
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
          environment.apiURL + 'Shop/ForgetPassword.php',
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
          environment.apiURL + 'Shop/CheckRandomString.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  resetPassword(
    Username: string,
    VerificationCode: string,
    NewPassword: string
  ) {
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
          environment.apiURL + 'Shop/ResetPassword.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  addCategory(formData: FormData) {
    const endpoint = environment.apiURL + 'Category/CategoryImage.php';
    return this._http.post(endpoint, formData).pipe(
      map(
        res => res.json(),
        // tslint:disable-next-line:no-shadowed-variable
        error => {
          console.log(error);
        }
      )
    );
  }

  getCategory(CategoryID: string) {
    return this._http
      .get(environment.apiURL + 'Category/SingleCategoryData.php?id=' + CategoryID)
      .pipe(map(res => res.json()));
  }

  getAllCategories(ShopID: string) {
    return this._http
      .get(environment.apiURL + 'Category/CategoryData.php?id=' + ShopID)
      .pipe(map(res => res.json()));
  }

  addProperty(CategoryID: number, Property: any) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { CategoryID: CategoryID, Property: Property };

    return (
      this._http
        .post(
          environment.apiURL + 'Category/AddProperties.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  getPropertiesforCategory(CategoryID: string) {
    return this._http
      .get(environment.apiURL + 'Category/CategoryPropertyData.php?id=' + CategoryID)
      .pipe(map(res => res.json()));
  }

  deleteProperty(PropertyID: number, CatgoryID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ID: PropertyID, CID: CatgoryID };

    return (
      this._http
        .post(
          environment.apiURL + 'Category/DeleteProperty.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }
}
