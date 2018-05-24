import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { Router } from '@angular/router';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {
  loginErrorMsg: string;
  constructor(
    private superadminservice: SuperAdminService,
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
    // localStorage.setItem('SleepUsername', this.loginAuth.getEmail());
    // this.logout();
  }

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  login(Password: string) {
    if (localStorage.getItem('SleepUsername') === null) {
      this.router.navigate(['login']);
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
              this.loginAuth.setUserLoggedIn(true);
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
              document
                .getElementsByTagName('body')[0]
                .classList.add('fixed');
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
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
