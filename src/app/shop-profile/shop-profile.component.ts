import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})
export class ShopProfileComponent implements OnInit {

  shopData: any = '';
  env = environment.apiURL;

  constructor(private superadminservice: SuperAdminService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.superadminservice.getShopDetails(this.loginAuth.getSUserID()).subscribe(
      res => {
        this.shopData = res;
      }
    );
  }

}
