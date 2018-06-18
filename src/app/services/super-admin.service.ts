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

  // to verify login

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

  // change password

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

  // forget password

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

  // step after forget password

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

  // reset password

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

  // upload website logo

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

  // get admin data

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

  // set admin detail

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

  // update profile image

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

  // get mail information

  getMailInfo() {
    return this._http
      .get(environment.apiURL + 'Website/GetMail.php')
      .pipe(map(res => res.json()));
  }

  // update mail information

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

  // get website information

  getWebInfo() {
    return this._http
      .get(environment.apiURL + 'Website/GetWebInfo.php')
      .pipe(map(res => res.json()));
  }

  // update website information

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

  // get shop data

  getShopsData() {
    return this._http
      .get(environment.apiURL + 'Shop/ShopData.php')
      .pipe(map(res => res.json()));
  }

  // get new shop detail

  getNewShops() {
    return this._http
      .get(environment.apiURL + 'Shop/NewShopData.php')
      .pipe(map(res => res.json()));
  }

  // get shop detail

  getShopDetails(ShopID: number) {
    return this._http
      .get(environment.apiURL + 'Shop/SingleShop.php?id=' + ShopID)
      .pipe(map(res => res.json()));
  }

  // set shop status

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

  // approve shop

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

  // delete shop

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

  // get all categories detail

  getAllCategories() {
    return this._http
    .get(environment.apiURL + 'Category/AllCategoriesData.php')
    .pipe(map(res => res.json()));
  }

  // set category is approved or not

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

  // send message

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

  // get detail of all product

  getAllProducts() {
    return this._http
    .get(environment.apiURL + 'Product/AllProductData.php')
    .pipe(map(res => res.json()));
  }

  // set product is approved

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

  // send order is shipped

  sendShipped(OrderDetailID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {OrderDetailID: OrderDetailID};
    return this._http
      .post(environment.apiURL + 'order/OrderShipped.php?id=' + OrderDetailID, data, options)
      .pipe(map(res => res.json()));
  }

  // send order is delievered

  sendDelievered(OrderDetailID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {OrderDetailID: OrderDetailID};
    return this._http
      .post(environment.apiURL + 'order/OrderDelievered.php?id=' + OrderDetailID, data, options)
      .pipe(map(res => res.json()));
  }

  // send reply of feedback

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

  // send tracking info

  sendTracking(Id: number, ttext: string , adate: string, atime: string, ddate: string, dtime: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {OrderDetailsID: Id, TrackingText: ttext, ArrivedDate: adate, DispatchedDate: ddate, ArrivedTime: atime,
       DispatchedTime: dtime};
    return this._http
      .post(environment.apiURL + 'Tracking/AddTracking.php', data, options)
      .pipe(map(res => res.json()));
  }

  // get feedback of seller

  getFeedback() {
    return this._http
      .get(environment.apiURL + 'feedback/getfeedbacks.php')
      .pipe(map(res => res.json()));
  }

  // get tracking detail of order

  getTrackingDetails(OrderDetailsID: string) {
    return this._http
    .get(environment.apiURL + 'Tracking/ViewTracking.php?id=' + OrderDetailsID)
    .pipe(map(res => res.json()));
  }

  // get all order

  getOrder() {
    return this._http
      .get(environment.apiURL + 'Order/GetAllOrder.php')
      .pipe(map(res => res.json()));
  }

  // get all user

  getAllUsers() {
    return this._http
      .get(environment.apiURL + 'User/AllUserData.php')
      .pipe(map(res => res.json()));
  }

  // to do active deavtive status of user

  setUserStatus(UserID: string, Status) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ID: UserID, Status: Status};
    return this._http
      .post(environment.apiURL + 'User/SetStatus.php', data, options)
      .pipe(map(res => res.json()));
  }
}
