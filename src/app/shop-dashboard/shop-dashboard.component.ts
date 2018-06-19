import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.css']
})
export class ShopDashboardComponent implements OnInit {

  constructor(private loginAuth: LoginauthService, private sellerservice: SellerService) { }

  OrderCount: number = 0;
  ProductCount: number = 0;
  UserCount: number = 0;
  Value: number = 0;
  orders: any = '';

  ngOnInit() {

    
    this.sellerservice.SellerDashBoard(this.loginAuth.getSUserID())
    .subscribe(
      res => {
        this.UserCount = res['Users'];
        this.OrderCount = res['Orders'];
        this.Value = res['Value'];
        this.ProductCount = res['Products'];
      }
    );

    this.sellerservice.getOrder(this.loginAuth.getSUserID())
    .subscribe(
      res => {
        this.orders = res['records'].slice(0,10);
      });
    
    
  }

}
