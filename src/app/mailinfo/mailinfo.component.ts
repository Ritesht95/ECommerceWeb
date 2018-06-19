import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-mailinfo',
  templateUrl: './mailinfo.component.html',
  styleUrls: ['./mailinfo.component.css']
})
export class MailinfoComponent implements OnInit {
  loginErrorMsg = null;
  infoEmail: string;
  emailValidFlag = false;
  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDivSuccess');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  timeoutD(val: boolean) {
    setTimeout(this.ShowAlertD, 5000, val);
  }

  ShowAlertD(val: boolean) {
    const alertDiv = document.getElementById('alertDivDanger');
    alertDiv.style.display = val ? 'block' : 'none';
  }


  constructor(
    private superadminservice: SuperAdminService,
    private loginAuth: LoginauthService
  ) {

  }

  ngOnInit() {
    this.superadminservice.getMailInfo().subscribe(
      res => {
        this.infoEmail = res['Email'];
        this.emailValidFlag = true;
      }
    );
  }

  // update mail information

  updateMailInfo(Email: string, Password: string) {
    this.superadminservice.updateMailInfo(Email, Password).subscribe(res => {
      if (res['key'] === 'true') {
        this.loginErrorMsg = 'Mail Settings updated Successfully.';
        this.ShowAlert(true);
        this.timeout(false);
        (<HTMLInputElement>document.getElementById('txtPassword')).value = '';
      } else {
        this.loginErrorMsg = 'Oops! Mail Settings could not be updated!';
        this.ShowAlertD(true);
        this.timeoutD(false);
        (<HTMLInputElement>document.getElementById('txtPassword')).value = '';
      }
    });
  }
}
