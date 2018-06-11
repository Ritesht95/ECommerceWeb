import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  DiscountData: any = [];
  singleDiscount = '';
  ProductData: any = [];
  ID: string = "new";
  ProdPrice: string = '';
  errorMsg = null;
  successMsg = null;
  type = '';
  discountAmount = '';
  constructor(private sellerservice: SellerService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.sellerservice.getDiscount(this.loginAuth.getSUserID()).subscribe(
      res => {
        this.DiscountData = res['records'];
        this.dtTrigger.next();
      }
    );



  }

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  timeoutS(val: boolean) {
    setTimeout(this.ShowAlertS, 5000, val);
  }

  ShowAlertS(val: boolean) {
    const alertDiv = document.getElementById('alertDivS');
    alertDiv.style.display = val ? 'block' : 'none';
    if (!val) {
      document.getElementById('discountClose').click();
    }
  }

  getSinglePrice(ID: string) {
    this.sellerservice.getSingleProduct(ID).subscribe(
      res => {
        this.ProdPrice = res['Price'];
      }
    );
  }

  FillProductData() {
    this.ID = "new";
    this.clearDropDown();
    this.sellerservice.getAllDiscountProducts(this.loginAuth.getSUserID())
      .subscribe(
        res => {
          this.ProductData = res['records'];
        });
  }

  SetInactive(ID: String) {
    this.sellerservice.SetDiscountStatus(ID, '0')
      .subscribe(
        res => {
          this.ngOnInit();
        });

  }

  SetActive(ID: String) {
    this.sellerservice.SetDiscountStatus(ID, '1')
      .subscribe(
        res => {
          this.ngOnInit();
        });

  }

  InsertDiscount(ProdID: string, Type: string, Discount: string) {
    let Flat;
    let Percentage;
    console.log(Discount);
    if (Type === 'Flat') {
      Flat = Discount;
      Percentage = null;
    } else {
      Percentage = Discount;
      Flat = null;
    }
    console.log(Flat);
    console.log(Percentage);
    this.sellerservice.AddDiscount(this.ID, ProdID, Flat, Percentage).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.successMsg = 'Discount Added Successfully';
          this.ShowAlertS(true);
          this.timeoutS(false);
          this.ngOnInit();
        } else {
          this.errorMsg = 'Something went wrong! Try again later.';
          this.ShowAlert(true);
          this.timeout(false);
          this.ngOnInit();
        }
      });

  }

  getSingleProductDiscount(ID: string) {
    this.ID = "update";
    this.clearDropDown();
    this.sellerservice.SingleDiscount(ID).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.singleDiscount = res;
          this.ProdPrice = res['Price'];

          if (this.singleDiscount['Flat'] === null) {
            this.type = 'Percent';
            this.discountAmount = this.singleDiscount['Percentage'];
            // (<HTMLInputElement>(document.getElementById('txtDiscount'))).value = this.singleDiscount['Percentage'];
          }
          else {
            this.type = 'Flat';
            this.discountAmount = this.singleDiscount['Flat'];
            // (<HTMLInputElement>(document.getElementById('txtDiscount'))).value = this.singleDiscount['Flat'];
          }
          console.log(this.type);
          var option = document.createElement("option");
          option.value = res['ProductID'];
          option.text = res['ProductName'];
          option.id = 'myoption';
          document.getElementById('ddProduct').appendChild(option);
          (<HTMLInputElement>document.getElementById('ddProduct')).value = res['ProductID'];
          document.getElementById('ddProduct').setAttribute('disabled', 'true');
        }
      }
    );
  }

  clearDropDown() {
    this.errorMsg = null;
    this.successMsg = null;
    // document.getElementById('ddProduct').innerText = null;
    try{
      document.getElementById('myoption').remove();
    }
    catch(e){
      //Nothing to do
    }
    document.getElementById('ddProduct').removeAttribute('disabled');
    document.getElementById('optFlat').removeAttribute('checked');
    document.getElementById('optPercent').removeAttribute('checked');
    this.type = '';
    (<HTMLInputElement>document.getElementById('txtDiscount')).value = '';

  }
}
