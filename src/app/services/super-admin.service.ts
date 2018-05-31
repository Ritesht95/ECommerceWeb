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
          environment.apiURL + 'SuperAdmin/ResetPassword.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  postFile(formData: FormData) {
    // const headers = new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // });
    // const options = new RequestOptions({ headers: headers });
    const endpoint = environment.apiURL + 'Website/WebsiteLogo.php';
    return this._http.post(endpoint, formData).pipe(
      map(
        res => {
          return res.json();
        },
        // tslint:disable-next-line:no-shadowed-variable
        error => {
          console.log(error);
        }
      )
    );
  }

  getAdminData(UserID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ID: UserID };
    return this._http
      .post(environment.apiURL + 'SuperAdmin/ReadInfo.php', data, options)
      .pipe(map(res => res.json()));
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
    return this._http
      .post(environment.apiURL + '/SuperAdmin/UpdateInfo.php', data, options)
      .pipe(map(res => res.json()));
  }

  updateProfileImage(formData: FormData) {
    const endpoint = environment.apiURL + 'SuperAdmin/AdminImage.php';
    return this._http.post(endpoint, formData).pipe(
      map(
        res => {
          return res.json();
        },
        // tslint:disable-next-line:no-shadowed-variable
        error => {
          console.log(error);
        }
      )
    );
  }

  getMailInfo() {
    return this._http
      .get(environment.apiURL + 'Website/GetMail.php')
      .pipe(map(res => res.json()));
  }

  updateMailInfo(Email: string, Password: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { Email: Email, Password: Password, Id: 1 };
    return this._http
      .post(environment.apiURL + '/Website/MailSetting.php', data, options)
      .pipe(map(res => res.json()));
  }

  getWebInfo() {
    return this._http
      .get(environment.apiURL + 'Website/GetWebInfo.php')
      .pipe(map(res => res.json()));
  }

  updateWebInfo(
    WebsiteName: string,
    Contact: string,
    GSTNo: string,
    TagLine: string,
    AboutUs: string,
    ContactUs: string,
    FacebookLink: string,
    TwitterLink: string,
    InstagramLink: string,
    YoutubeLink: string,
    Id: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      WebsiteName: WebsiteName,
      Contact: Contact,
      GSTNo: GSTNo,
      TagLine: TagLine,
      AboutUs: AboutUs,
      ContactUs: ContactUs,
      FacebookLink: FacebookLink,
      TwitterLink: TwitterLink,
      InstagramLink: InstagramLink,
      YoutubeLink: YoutubeLink,
      Id: Id
    };
    return this._http
      .post(environment.apiURL + '/Website/UpdateInfo.php', data, options)
      .pipe(map(res => res.json()));
  }

  getShopsData() {
    return this._http
      .get(environment.apiURL + 'Shop/ShopData.php')
      .pipe(map(res => res.json()));
  }

  getNewShops() {
    return this._http
      .get(environment.apiURL + 'Shop/NewShopData.php')
      .pipe(map(res => res.json()));
  }

  getShopDetails(ShopID: number) {
    return this._http
      .get(environment.apiURL + 'Shop/SingleShop.php?id=' + ShopID)
      .pipe(map(res => res.json()));
  }

  setShopStatus(ShopID: number, Status: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ShopID: ShopID, Status: Status };
    return this._http
      .post(environment.apiURL + 'Shop/SetShopStatus.php', data, options)
      .pipe(map(res => res.json()));
  }

  setShopApproveStatus(ShopID: number, Status: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ShopID: ShopID, Status: Status };
    return this._http
      .post(environment.apiURL + 'Shop/SetShopApproveStatus.php', data, options)
      .pipe(map(res => res.json()));
  }

  setShopDelete(ShopID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ShopID: ShopID };
    return this._http
      .post(environment.apiURL + 'Shop/DeleteShop.php', data, options)
      .pipe(map(res => res.json()));
  }
  
  getAllCategories() {
    return this._http
    .get(environment.apiURL + 'Category/AllCategoriesData.php')
    .pipe(map(res => res.json()));
  }

  setCategoryApproved(CategoryID: string, value: boolean) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { CategoryID: CategoryID, Approved: value };
    return this._http
      .post(environment.apiURL + 'Category/DisableCategory.php', data, options)
      .pipe(map(res => res.json()));
  }
  
  sendMessage(Name: string, Email: string, Message: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { Name: Name, Email: Email, Feedback: Message, Type: 'seller'};
    return this._http
      .post(environment.apiURL + 'feedback/addfeedback.php', data, options)
      .pipe(map(res => res.json()));
  }
  
  getAllProducts() {
    return this._http
    .get(environment.apiURL + 'Product/AllProductData.php')
    .pipe(map(res => res.json()));
  }

  setProductApproved(ProductID: string, value: boolean) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ProductID: ProductID, Approved: value };
    return this._http
      .post(environment.apiURL + 'Product/DisableProduct.php', data, options)
      .pipe(map(res => res.json()));
  }   

  sendReply(Id: number, Subject: string , Reply: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {Id: Id, Subject: Subject , Reply: Reply};
    return this._http
      .post(environment.apiURL + 'feedback/reply.php', data, options)
      .pipe(map(res => res.json()));
  }

  getFeedback() {
    return this._http
      .get(environment.apiURL + 'feedback/getfeedbacks.php')
      .pipe(map(res => res.json()));
  }
  
}
