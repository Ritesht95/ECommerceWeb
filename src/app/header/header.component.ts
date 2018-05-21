import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdmin } from '../classes/super-admin';
import { SuperAdminService } from '../services/super-admin.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminData: any;
  UserID: number;
  Name: string;
  

  constructor(
    private loginAuth: LoginauthService,
    private superAdminService: SuperAdminService,
    private router: Router
  ) {

    this.UserID = this.loginAuth.getUserID();
    this.Name = this.loginAuth.getName();
  }

  ngOnInit() {
    console.log('sddvjsdk');
    this.superAdminService.getAdminData(this.loginAuth.getUserID()).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      res => {
        this.adminData = res;
        document.getElementById('userImage').src = environment.apiURL + 'Assets/AdminImages/' +  this.adminData.AdminImage;
        document.getElementById('userHeaderImage').src = environment.apiURL + 'Assets/AdminImages/' +  this.adminData.AdminImage;
        console.log(res);
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    this.superAdminService.changePassword(oldPassword, newPassword).subscribe(
      res => {
        if (res['key'] === 'incorrect') {
          // Wrong old Password
          console.log('Wrong old Password');
        } else if (res['key'] === 'same') {
          // Same as Current Password
          console.log('Same as Current Password');
        } else if (res['key'] === 'oldsame') {
          // Same as Previous Password
          console.log('Same as Previous Password');
        } else if (res['key'] === '0') {
          // Server Error
          console.log('Server Error');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.loginAuth
      .setServerLogout(this.loginAuth.getEmail(), this.loginAuth.getUserType())
      .subscribe(
        res => {
          if (res.json()['key'] === 'true') {
            localStorage.removeItem('sessionUserID');
            localStorage.removeItem('sessionName');
            localStorage.removeItem('sessionEmail');
            localStorage.removeItem('sessionUserType');
            localStorage.setItem('loggedIn', 'false');
            this.loginAuth.setUserLoggedIn(false);
            this.router.navigate(['login']);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
