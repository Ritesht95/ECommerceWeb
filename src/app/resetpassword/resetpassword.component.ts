import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  type: string = 'null';
  rand: string = 'null';
  errorMsg = null;
  Username = null;
  webinfoData = '';
  env = environment.apiURL;

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  constructor(
    private superadminservice: SuperAdminService,
    private sellerservice: SellerService,
    private routeAct: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeAct.queryParams.subscribe(params => {
      if(params['rand'] !== undefined)
        this.rand = params['rand'];
      this.type = params['type'];
    });

    if (this.type === 'admin') {
      this.superadminservice.checkRandomString(this.rand).subscribe(res => {
        if (res['key'] === 'false') {
          this.router.navigate(['notfound']);
        } else if (res['key'] === 'expired') {
          document.getElementById('frmReset').style.display = 'none';
          document.getElementById('divLinkExpired').style.display = 'block';
          // Link Expired
        } else {
          this.Username = res['Email'];
        }
      });
    } else {
      this.sellerservice.checkRandomString(this.rand).subscribe(res => {
        if (res['key'] === 'false') {
          this.router.navigate(['notfound']);
        } else if (res['key'] === 'expired') {
          document.getElementById('frmReset').style.display = 'none';
          document.getElementById('divLinkExpired').style.display = 'block';
          // Link Expired
        } else {
          this.Username = res['Email'];
        }
      });
    }

    this.superadminservice.getWebInfo().subscribe(
      res => {
        this.webinfoData = res;
      }
    );

  }

  // reset password

  ResetPassword(VerificationCode: string, NewPassword: string) {
    if (this.type === 'admin') {
      this.superadminservice
        .resetPassword(this.Username, VerificationCode, NewPassword)
        .subscribe(res => {
          if (res['key'] === 'true') {
            this.errorMsg = 'Password reset successfully.';
            this.ShowAlert(true);
            this.timeout(false);
            this.router.navigate(['/login']);
          } else if (res['key'] === 'same') {
            this.errorMsg = 'Use new password, this was already used before!';
            this.ShowAlert(true);
            this.timeout(false);
          } else {
            this.errorMsg = 'Wrong verification code!';
            this.ShowAlert(true);
            this.timeout(false);
          }
        });
    } else {
      this.sellerservice
        .resetPassword(this.Username, VerificationCode, NewPassword)
        .subscribe(res => {
          if (res['key'] === 'true') {
            this.errorMsg = 'Password reset successfully.';
            this.ShowAlert(true);
            this.timeout(false);
          } else if (res['key'] === 'same') {
            this.errorMsg = 'Use new password, this was already used before!';
            this.ShowAlert(true);
            this.timeout(false);
          } else {
            this.errorMsg = 'Wrong verification code!';
            this.ShowAlert(true);
            this.timeout(false);
          }
        });
    }
  }
}
