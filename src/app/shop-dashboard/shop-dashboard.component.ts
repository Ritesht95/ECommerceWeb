import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.css']
})
export class ShopDashboardComponent implements OnInit {
  constructor(
    private loginAuth: LoginauthService,
    private sellerservice: SellerService
  ) {}

  OrderCount = 0;
  ProductCount = 0;
  UserCount = 0;
  Value = 0;
  orders: any = '';

  ngOnInit() {
    this.sellerservice
      .SellerDashBoard(this.loginAuth.getSUserID())
      .subscribe(res => {
        this.UserCount = res['Users'];
        this.OrderCount = res['Orders'];
        if (res['Value'] !== null) {
          this.Value = res['Value'];
        }
        this.ProductCount = res['Products'];
      });

    this.sellerservice.getOrder(this.loginAuth.getSUserID()).subscribe(res => {
      if (res['records'] !== undefined) {
        if (res['records'].length > 10) {
          this.orders = res['records'].slice(0, 10);
        } else {
          this.orders = res['records'];
        }
      }
    });
  }
}
