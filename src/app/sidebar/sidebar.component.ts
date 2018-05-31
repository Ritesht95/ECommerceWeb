import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  adminData: any = '';
  shopData: any = '';
  Name: string;
  userType: boolean;

  constructor(
    private loginAuth: LoginauthService,
    private superadminservice: SuperAdminService
  ) {}

  ngOnInit() {
    if (this.loginAuth.getSUserLoggedIn()) {
      this.userType = true;
    } else {
      this.userType = false;
    }
    if (!this.userType) {
      this.superadminservice.getAdminData(this.loginAuth.getUserID()).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        res => {
          this.Name = res['Adminname'];
          this.adminData = res;
          document.getElementById('sidebarName').innerHTML = res['Adminname'];
          document
            .getElementById('profileImage')
            .setAttribute(
              'src',
              environment.apiURL +
                'Assets/AdminImages/' +
                this.adminData.AdminImage
            );
        }
      );
    } else {
      this.superadminservice.getShopDetails(this.loginAuth.getSUserID()).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        res => {
          this.Name = res['ShopName'];
          this.shopData = res;
          document.getElementById('sidebarName').innerHTML = res['ShopName'];
          document
            .getElementById('profileImage')
            .setAttribute(
              'src',
              environment.apiURL +
                'Assets/ShopLogo/' +
                this.shopData.LogoImage
            );
        }
      );
    }

  }
}
