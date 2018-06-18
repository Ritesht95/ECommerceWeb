import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { SuperAdminService } from '../services/super-admin.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginauthService } from '../loginauth.service';
import { SuperAdmin } from '../classes/super-admin';
import { SellerService } from '../services/seller.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SuperAdminService]
})
export class LoginComponent {
  flag: boolean;
  showStyle = false;
  loginform: FormGroup;
  public resData: SuperAdmin;
  errormessage: string;
  loginErrorMsg = null;
  UserID = '';
  env = environment.apiURL;
  webinfoData = '';

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  timeout1(val: boolean) {
    setTimeout(this.ShowAlert1, 5000, val);
  }

  ShowAlert1(val: boolean) {
    const alertDiv = document.getElementById('alertDiv1');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  constructor(
    private superadminservice: SuperAdminService,
    private sellerservice: SellerService,
    private router: Router,
    private loginAuth: LoginauthService
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.superadminservice.getWebInfo().subscribe(res => {
      this.webinfoData = res;
    });
  }

  //  check login

  CheckLogin(Email: string, Password: string, Type: string) {
    if (Type === 'Admin') {
      this.superadminservice.checkLogin(Email, Password).subscribe(
        res => {
          // Change 0 to False using JSON in below line
          if (res['key'] === 'false' || res === undefined) {
            this.loginErrorMsg = 'Incorrect Username or Password!';
            this.ShowAlert(true);
            this.timeout(false);
          } else {
            this.loginAuth.setUserLoggedIn(true);
            this.loginAuth.setValues(
              res['Adminid'],
              res['Email'],
              'superadmin',
              res['Adminname']
            );
            this.router.navigate(['dashboard']);
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.sellerservice.checkLogin(Email, Password).subscribe(res => {
        console.log(res);
        if (res['key'] === 'false' || res === undefined) {
          this.loginErrorMsg = 'Incorrect Username or Password!';
          this.ShowAlert(true);
          this.timeout(false);
        } else {
          if (res['IsInitialSetup'] === '0') {
            this.UserID = res['ShopID'];
            document.getElementById('btnIniItModal').click();
          } else {
            this.loginAuth.setSUserLoggedIn(true);
            console.log(res['Email']);
            this.loginAuth.setValues(
              res['ShopID'],
              res['Email'],
              'seller',
              res['ShopName']
            );
            this.router.navigate(['shopdashboard']);
          }
        }
      });
    }
  }

  // set user log in

  InitSetup(NUsername: string, NPassword: string) {
    this.sellerservice
      .InitialSetup(this.UserID, NUsername, NPassword)
      .subscribe(res => {
        if (res['key'] === 'true') {
          document.getElementById('btnCloseFeedback').click();
          this.loginAuth.setSUserLoggedIn(true);
          console.log(res['Email']);
          this.loginAuth.setValues(
            res['ShopID'],
            res['Email'],
            'seller',
            res['ShopName']
          );
          this.router.navigate(['shopdashboard']);
        } else {
          this.errormessage =
            'Could not complete Initial Setup! Try again later.';
          this.ShowAlert1(true);
          this.timeout1(false);
        }
      });
  }

  // check user name

  checkUsername(Username: string) {
    this.sellerservice.checkUsername(Username).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.errormessage = 'Username already exist';
          this.flag = true;
          this.ShowAlert1(true);
          this.timeout1(false);
        } else {
          this.flag = false;
        }
      }
    );
  }
}
