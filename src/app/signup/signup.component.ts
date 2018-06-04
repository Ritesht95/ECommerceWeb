import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  webinfoData: any = '';
  env = environment.apiURL;
  errorMessage: string;
  successMessage: string;

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
    this.clearForm();
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDiv');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  timeoutS(val: boolean) {
    setTimeout(this.ShowAlertS, 2000, val);
    this.clearForm();
  }

  clearForm() {
    (<HTMLInputElement>document.getElementById('txtShopname')).value = '';
    (<HTMLInputElement>document.getElementById('txtOwnerName')).value = '';
    (<HTMLInputElement>document.getElementById('txtShopType')).value = '';
    (<HTMLInputElement>document.getElementById('txtEmail')).value = '';
    (<HTMLInputElement>document.getElementById('txtPhoneNo')).value = '';
  }

  ShowAlertS(val: boolean) {
    const alertDiv = document.getElementById('alertDivS');
    alertDiv.style.display = val ? 'block' : 'none';
  }

  constructor(private sellerservice: SellerService, private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.superadminservice.getWebInfo().subscribe(
      res => {
        this.webinfoData = res;
      }
    );
  }

  signUp(SName: string, SType: string, PhoneNo: string, Email: string, OName: string) {
    this.sellerservice.setSignUp(SName, SType, PhoneNo, Email, OName).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.successMessage = 'Your shop request has been sent to administator.';
          this.ShowAlertS(true);
          this.timeoutS(false);
        } else {
          this.errorMessage = 'Something went wrong!<br>Try again later';
          this.ShowAlert(true);
          this.timeout(false);
        }
      }
    );
  }

}
