import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { Router } from '@angular/router';
import { SuperAdminService } from '../services/super-admin.service';
import { SellerService } from '../services/seller.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {
  loginErrorMsg: string;
  userData: any = '';
  adminData: any = '';
  webInfo: any = '';
  env = environment.apiURL;
  constructor(
    private superadminservice: SuperAdminService,
    private sellerservice: SellerService,
    private loginAuth: LoginauthService,
    private router: Router
  ) {
    document.getElementsByTagName('body')[0].classList.remove('skin-blue');
    document.getElementsByTagName('body')[0].classList.remove('sidebar-mini');
    document.getElementsByTagName('body')[0].classList.remove('fixed');
    document.getElementsByTagName('body')[0].classList.add('lockscreen');
    document.getElementsByTagName('body')[0].classList.add('hold-transition');
    document
      .getElementsByTagName('body')[0]
      .setAttribute('background-color', '#808080');
  }

  ngOnInit() {
    if (localStorage.getItem('SleepType') === 'seller') {
      this.sellerservice
        .getSellerProfile(localStorage.getItem('SleepUsername'))
        .subscribe(res => {
          this.userData = res;
        });
    } else {
      this.superadminservice
        .getAdminData(localStorage.getItem('SleepUsername'))
        .subscribe(res => {
          this.adminData = res;
        });
    }
    this.superadminservice.getWebInfo().subscribe(res => {
      this.webInfo = res;
    });
  }

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  // log in function

  login(Password: string) {
    alert(localStorage.getItem('SleepUsername'));
    if (localStorage.getItem('SleepUsername') === null) {
      this.router.navigate(['login']);
    } else {
      if (localStorage.getItem('SleepType') === 'seller') {
        this.sellerservice
          .checkLogin(localStorage.getItem('SleepUsername'), Password)
          .subscribe(
            res => {
              // Change 0 to False using JSON in below line
              if (res['key'] === 'false' || res === undefined) {
                this.loginErrorMsg = 'Incorrect Username or Password!';
                this.ShowAlert(true);
                this.timeout(false);
              } else {
                this.loginAuth.setUserLoggedIn('true');
                this.loginAuth.setValues(
                  res['ShopID'],
                  res['Email'],
                  'seller',
                  res['ShopName']
                );
                document
                  .getElementsByTagName('body')[0]
                  .classList.add('skin-blue');
                document
                  .getElementsByTagName('body')[0]
                  .classList.add('sidebar-mini');
                document.getElementsByTagName('body')[0].classList.add('fixed');
                document
                  .getElementsByTagName('body')[0]
                  .classList.remove('lockscreen');
                document
                  .getElementsByTagName('body')[0]
                  .classList.remove('hold-transition');
                this.router.navigate(['shopdashboard']);
              }
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.superadminservice
          .checkLogin(localStorage.getItem('SleepUsername'), Password)
          .subscribe(
            res => {
              // Change 0 to False using JSON in below line
              if (res['key'] === 'false' || res === undefined) {
                this.loginErrorMsg = 'Incorrect Username or Password!';
                this.ShowAlert(true);
                this.timeout(false);
              } else {
                this.loginAuth.setUserLoggedIn('true');
                this.loginAuth.setValues(
                  res['Adminid'],
                  res['Email'],
                  'superadmin',
                  res['Adminname']
                );
                document
                  .getElementsByTagName('body')[0]
                  .classList.add('skin-blue');
                document
                  .getElementsByTagName('body')[0]
                  .classList.add('sidebar-mini');
                document.getElementsByTagName('body')[0].classList.add('fixed');
                document
                  .getElementsByTagName('body')[0]
                  .classList.remove('lockscreen');
                document
                  .getElementsByTagName('body')[0]
                  .classList.remove('hold-transition');
                this.router.navigate(['dashboard']);
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    }
  }

  setDesign() {
    document.getElementsByTagName('body')[0].classList.add('skin-blue');
    document.getElementsByTagName('body')[0].classList.add('sidebar-mini');
    document.getElementsByTagName('body')[0].classList.add('fixed');
    document.getElementsByTagName('body')[0].classList.remove('lockscreen');
    document
      .getElementsByTagName('body')[0]
      .classList.remove('hold-transition');
  }

  logout() {}
}
