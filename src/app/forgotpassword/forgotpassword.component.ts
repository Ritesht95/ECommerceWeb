import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  errorMsg = null;

  timeout(val: boolean) {
    this.ShowAlert(true);
    setTimeout( this.ShowAlert, 5000 , val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = (val) ? 'block' : 'none';
  }

  constructor(private superadminservice: SuperAdminService) { }

  ngOnInit() {

  }

  ForgotPassword(Username: string, Type: string) {
    if (Type === 'Admin') {
      this.superadminservice.forgotPassword(Username).subscribe(
        res => {
          if (res['key'] === 'false') {
            console.log('false');
            this.errorMsg = 'Something went wrong!';
            this.timeout(false);
          } else if (res['key'] === 'nexist') {
            console.log('nexist');
            this.errorMsg = 'This Email or Phone no is not registered with us!';
            this.timeout(false);
          } else {
            console.log('true');
            document.getElementById('alertInnerDiv').classList.remove('text-danger');
            document.getElementById('alertInnerDiv').classList.add('text-success');
            this.errorMsg = 'Reset link and Verification Code has been sent to your mail.';
            this.timeout(false);
          }
        },
        error => {

        }
      );
    }
  }


}
