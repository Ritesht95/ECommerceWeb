import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SuperAdminService } from '../services/super-admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SuperAdminService],
})

export class LoginComponent {

  loginform: FormGroup;

  // @Output() check_login_event = new EventEmitter();

  constructor(private superadminservice: SuperAdminService) {
    }

  CheckLogin(Email: string, Password: string) {
    this.superadminservice.checkLogin(Email, Password)
    .subscribe(string => {console.log('hello'); },
    error => console.log(error));
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }

}
