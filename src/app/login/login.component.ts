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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SuperAdminService]
})
export class LoginComponent {
  showStyle = false;
  loginform: FormGroup;
  public resData: SuperAdmin;
  errormessage: string;
  loginErrorMsg = null;


  timeout(val: boolean) {
    console.log('form');
    setTimeout( this.ShowAlert, 5000 , val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = (val) ? 'block' : 'none';
  }
  // @Output() check_login_event = new EventEmitter();

  constructor(
    private superadminservice: SuperAdminService,
    private router: Router,
    private loginAuth: LoginauthService
  ) {}

  CheckLogin(Email: string, Password: string, Type: string) {
    console.log(Type);
    if (Type === 'Admin') {
      this.superadminservice.checkLogin(Email, Password).subscribe(
        res => {
          // this.resData = res;
          console.log(res);
          // Change 0 to False using JSON in below line
          if (res['key'] === 'false' || res === undefined) {
            console.log('login failed!');
            this.loginErrorMsg = 'Incorrect Username or Password!';
            this.ShowAlert(true);
            this.timeout(false);
          } else {
            console.log('login success!');
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
      console.log('Seller Login');
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {}
}
