import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SuperAdminService } from '../services/super-admin.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginauthService } from '../loginauth.service';
import { SuperAdmin } from '../classes/super-admin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SuperAdminService],
})

export class LoginComponent {

  loginform: FormGroup;
  public resData: SuperAdmin;
  errormessage: string;

  // @Output() check_login_event = new EventEmitter();

  constructor(
          private superadminservice: SuperAdminService
          , private router: Router
          , private loginAuth: LoginauthService,
        ) {
    }

  CheckLogin(Email: string, Password: string) {
    this.superadminservice.checkLogin(Email, Password).subscribe(
      res => {
        this.resData =  res;
        if (res === 0) {
          console.log('login failed!');
        } else {
          console.log('login success!');
          this.loginAuth.setUserLoggedIn(true);
          this.loginAuth.setValues(res['Adminid'], res['Email'], 'SuperAdmin', res['Adminname']);
          this.router.navigate(['dashboard']);
        }
      },
      error => { console.log(error); }
    );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }

}
