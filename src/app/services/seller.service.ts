import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { INSPECT_MAX_BYTES } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  constructor(private _http: Http, private userSession: LoginauthService) {}

  setSignUp(
    SName: string,
    SType: string,
    PhoneNo: string,
    Email: string,
    OName: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      ShopName: SName,
      ShopType: SType,
      PhoneNo: PhoneNo,
      Email: Email,
      OwnerName: OName
    };

    return (
      this._http
        .post(environment.apiURL + 'Shop/Signup.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  checkLogin(Username: string, Password: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });

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
        .post(environment.apiURL + 'Shop/ForgetPassword.php', data, options)
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
        .post(environment.apiURL + 'Shop/CheckRandomString.php', data, options)
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
        .post(environment.apiURL + 'Shop/ResetPassword.php', data, options)
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
      ShopID: this.userSession.getSUserID()
    };

    return (
      this._http
        .post(
          environment.apiURL + 'Shop/ChangePassword.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  checkUsername(Username: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      username: Username
    };

    return (
      this._http
        .post(
          environment.apiURL + 'Shop/SameUsername.php',
          data,
          options
        )
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  InitialSetup(UserID: string, NUsername: string, NPassword: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      ShopID: UserID, NUsername: NUsername, NPassword : NPassword
    };

    return (
      this._http
        .post(
          environment.apiURL + 'Shop/InitialSetup.php',
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
      .get(
        environment.apiURL + 'Category/SingleCategoryData.php?id=' + CategoryID
      )
      .pipe(map(res => res.json()));
  }

  getAllCategories() {
    return this._http
      .get(environment.apiURL + 'Category/AllCategoriesData.php')
      .pipe(map(res => res.json()));
  }

  getAllShopCategories(ShopID: String) {
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
        .post(environment.apiURL + 'Category/AddProperties.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  getPropertiesforCategory(CategoryID: string) {
    return this._http
      .get(
        environment.apiURL +
          'Category/CategoryPropertyData.php?id=' +
          CategoryID
      )
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
        .post(environment.apiURL + 'Category/DeleteProperty.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  getAllProducts(ShopID: number) {
    return this._http
      .get(environment.apiURL + 'Product/GetProductData.php?id=' + ShopID)
      .pipe(map(res => res.json()));
  }

  getSingleProduct(ProductID: string) {
    return this._http
      .get(environment.apiURL + 'Product/SingleProductData.php?id=' + ProductID)
      .pipe(map(res => res.json()));
  }

  addProduct(formData: FormData) {
    const endpoint = environment.apiURL + 'Product/AddProduct.php';
    return this._http.post(endpoint, formData).pipe(
      map(
        res => res.json(),
        error => {
          console.log(error);
        }
      )
    );
  }

  addStock(ProductID: string, stockNumber: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ProductID: ProductID, Stock: stockNumber };

    return this._http
      .post(environment.apiURL + 'Product/AddStock.php', data, options)
      .pipe(map(res => res.json()));
  }

  deleteImage(ID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { ID: ID };

    return this._http
      .post(environment.apiURL + 'Product/DeleteImage.php', data, options)
      .pipe(map(res => res.json()));
  }

  getOrder(Id: number) {
    return this._http
      .get(environment.apiURL + 'order/getShopOrders.php?id=' + Id)
      .pipe(map(res => res.json()));
  }

  sendOrder(OrderDetailID: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {OrderDetailID: OrderDetailID};
    return this._http
      .post(environment.apiURL + 'order/OrderConfirm.php?id=' + OrderDetailID, data, options)
      .pipe(map(res => res.json()));
  }

  getCustomerDetail(oid: number, cid: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {oid: oid, cid: cid};
    return this._http
      .post(environment.apiURL + 'User/UserDetailsOrder.php?oid=' + oid + '&cid=' + cid, data, options)
      .pipe(map(res => res.json()));
  }

  getSellerProfile(ShopID: number) {
    return this._http
      .get(environment.apiURL + 'Shop/SingleShop.php?id=' + ShopID)
      .pipe(map(res => res.json()));
  }

  setSellerProfile(
    ShopID: number,
    ShopName: string,
    ShopType: string,
    Contact: string,
    Email: string,
    Address: string,
    City: string,
    State: string,
    Pincode: string
  ) {

      const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });

      const data: object = {
      ShopID: ShopID,
      ShopName: ShopName,
      ShopType: ShopType,
      Contact: Contact,
      Email: Email,
      Address: Address,
      City: City,
      State: State,
      Pincode: Pincode
    };

    return this._http
      .post(environment.apiURL + 'Shop/UpdateShopInfo.php', data, options)
      .pipe(map(res => res.json()));
  }

  setSellerProfile2(formData: FormData) {
    const endpoint = environment.apiURL + 'Shop/UpdateBusinessDetails.php';
    return this._http.post(endpoint, formData).pipe(
      map(
        res => res.json(),
        error => {
          console.log(error);
        }
      )
    );
  }

  setSellerProfile3(
    ShopID: number,
    FL: string,
    TL: string,
    IL: string,
    YL: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      ShopID: ShopID,
      FL: FL,
      TL: TL,
      IL: IL,
      YL: YL
    };

    return this._http
      .post(environment.apiURL + 'Shop/UpdateSocialLinks.php', data, options)
      .pipe(map(res => res.json()));
  }

  getCategoryProperties(CategoryID: string, ProductID: string) {
    return this._http
      .get(environment.apiURL + 'Category/getProperties.php?id=' + CategoryID + '&pid=' + ProductID)
      .pipe(map(res => res.json()));
  }

  setProductProperties(ProductID: string, FormValues: any[], Operation: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      ProductID: ProductID,
      FormValues: FormValues,
      operation: Operation
    };

    return this._http
      .post(environment.apiURL + 'Category/AddPropertyValue.php', data, options)
      .pipe(map(res => res.json()));
  }

  getTrackingDetails(OrderDetailsID: string, SellerID: string) {
    return this._http
    .get(environment.apiURL + 'Tracking/ViewTracking.php?id=' + OrderDetailsID + '&sid=' + SellerID)
    .pipe(map(res => res.json()));
  }

  setProductActive(pid: String, Status: String){
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      ProductID: pid,
      Approved: Status
    };

    return this._http
      .post(environment.apiURL + 'Product/ActiveStatusProduct.php', data, options)
      .pipe(map(res => res.json()));
  }

  ClearAllNotificationSeller(ID: String){
    return this._http
      .get(environment.apiURL + 'Notification/ClearAllNotification.php?id='+ID)
      .pipe(map(res => res.json())); 
  }

  getNotifications(Id: string){
    return this._http
      .get(environment.apiURL + 'Notification/GetSellerNoti.php?id='+Id)
      .pipe(map(res => res.json()));
  }

  getDiscount(ID: String){
    return this._http
      .get(environment.apiURL + 'Discount/GetAllShopDiscount.php?id='+ID)
      .pipe(map(res => res.json())); 
  }

  SetDiscountStatus(ID: String, Status: String){
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      ProdID: ID,
      Status: Status
    };

    return this._http
      .post(environment.apiURL + 'Discount/SetDiscountStatus.php', data, options)
      .pipe(map(res => res.json()));
  }

  getAllDiscountProducts(ID: String){
    return this._http
      .get(environment.apiURL + 'Product/DiscountProduct.php?id='+ID)
      .pipe(map(res => res.json())); 
  }

  AddDiscount(ID: string,ProdID: string,Flat: string,Percentage: string){
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      id: ID,
      ProdID: ProdID,
      Flat: Flat,
      Percentage: Percentage
    };

    return this._http
      .post(environment.apiURL + 'Discount/AddDiscount.php', data, options)
      .pipe(map(res => res.json()));
  }

  SingleDiscount(ID: string){
    return this._http
      .get(environment.apiURL + 'Discount/getSingleProductDiscount.php?id='+ID)
      .pipe(map(res => res.json())); 
  }

  SellerDashBoard(ID: string){
    return this._http
      .get(environment.apiURL + 'Dashborard/SellerDashboard.php?id='+ID)
      .pipe(map(res => res.json())); 
  }

}
