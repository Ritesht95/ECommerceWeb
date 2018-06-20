import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sudashborad',
  templateUrl: './sudashborad.component.html',
  styleUrls: ['./sudashborad.component.css']
})
export class SudashboradComponent implements OnInit {
  UserID: number;
  Name: string;
  UserCount = '0';
  ProductCount = '0';
  ShopCount = '0';
  OrderCount = '0';
  NewUserData: any;
  NewShopData: any;
  env = environment.apiURL;
  NoOfUser = 0;
  NoofShop = 0;
  Value = 0;

  constructor(
    private loginAuth: LoginauthService,
    private superadminservice: SuperAdminService
  ) {}

  ngOnInit() {
    this.UserID = this.loginAuth.getUserID();
    this.Name = this.loginAuth.getName();

    this.superadminservice.TotalValue().subscribe(res => {
      this.Value = res['Amount'];
    });

    this.superadminservice.DashboardCounts().subscribe(res => {
      this.UserCount = res['Users'];
      this.ProductCount = res['Products'];
      this.OrderCount = res['Orders'];
      this.ShopCount = res['Shops'];
    });

    this.superadminservice.DashboardNewUsers().subscribe(res => {
      this.NewUserData = res['records'];
      this.NoOfUser = this.NewUserData.length;
    });

    this.superadminservice.DashboardNewShops().subscribe(res => {
      this.NewShopData = res['records'];
      this.NoofShop = this.NewShopData.length;
    });
  }
}
