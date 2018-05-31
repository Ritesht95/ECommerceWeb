import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdmin } from '../classes/super-admin';
import { SuperAdminService } from '../services/super-admin.service';
import {
  Router,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { environment } from '../../environments/environment';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ShopauthGuard } from '../shopauth.guard';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fileToUpload: File = null;
  formData: FormData = new FormData();
  adminData: any = '';
  shopData: any = '';
  UserID: number;
  Name: string;
  flag: boolean;
  errorMessage: string;
  successMessage: string;
  userType: boolean;

  sidebarComp: SidebarComponent = new SidebarComponent(
    this.loginAuth,
    this.superadminservice
  );

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
    (<HTMLInputElement>document.getElementById('txtNewPassword')).value = '';
    (<HTMLInputElement>document.getElementById('txtCPassword')).value = '';
    (<HTMLInputElement>document.getElementById('txtOldPassword')).value = '';
  }

  ShowAlertS(val: boolean) {
    const alertDiv = document.getElementById('alertDivS');
    alertDiv.style.display = val ? 'block' : 'none';
    if (!val) {
      document.getElementById('btnClose').click();
    }
  }

  constructor(
    private loginAuth: LoginauthService,
    private superadminservice: SuperAdminService,
    private elem: ElementRef,
    private router: Router
  ) {
    this.UserID = this.loginAuth.getUserID();
    this.Name = this.loginAuth.getName();
  }

  upload(event: any) {
    const files = this.elem.nativeElement.querySelector('#image').files;
    // const files: any = event.target.files;

    this.formData.append('image', files[0], files[0].name);
    this.formData.append('AdminId', this.loginAuth.getUserID());

    if (!this.validateFile(files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    } else {
      this.fileToUpload = files.item(0);
    }
  }

  validateFile(name: String) {
    const ext: string = name.substring(name.lastIndexOf('.') + 1);
    if (
      ext.toLowerCase() === 'png' ||
      ext.toLowerCase() === 'jpg' ||
      ext.toLowerCase() === 'jpeg'
    ) {
      this.flag = false;
      return true;
    } else {
      this.flag = true;
      return false;
    }
  }

  ngOnInit() {
    if (this.loginAuth.getSUserLoggedIn()) {
      this.userType = true;
    } else {
      this.userType = false;
    }
    if (!this.userType) {
      this.superadminservice.getAdminData(this.loginAuth.getUserID()).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        res => {
          this.adminData = res;
          document.getElementById('headerName').innerHTML = res['Adminname'];
          document.getElementById('headerName1').innerHTML = res['Adminname'];
          document
            .getElementById('userImage')
            .setAttribute(
              'src',
              environment.apiURL +
                'Assets/AdminImages/' +
                this.adminData.AdminImage
            );
          document
            .getElementById('userHeaderImage')
            .setAttribute(
              'src',
              environment.apiURL +
                'Assets/AdminImages/' +
                this.adminData.AdminImage
            );
        }
      );
    } else {
      this.superadminservice.getShopDetails(this.loginAuth.getSUserID()).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        res => {
          this.shopData = res;
          document.getElementById('headerName').innerHTML = res['ShopName'];
          document.getElementById('headerName1').innerHTML = res['ShopName'];
          document
            .getElementById('userImage')
            .setAttribute(
              'src',
              environment.apiURL +
                'Assets/ShopLogo/' +
                this.shopData.LogoImage
            );
          document
            .getElementById('userHeaderImage')
            .setAttribute(
              'src',
              environment.apiURL +
                'Assets/ShopLogo/' +
                this.shopData.LogoImage
            );
        }
      );
    }

  }

  changePassword(oldPassword: string, newPassword: string) {
    this.superadminservice.changePassword(oldPassword, newPassword).subscribe(
      res => {
        if (res['key'] === 'incorrect') {
          // Wrong old Password
          this.errorMessage = 'Wrong old Password';
          this.ShowAlert(true);
          this.timeout(false);
        } else if (res['key'] === 'same') {
          // Same as Current Password
          this.errorMessage = 'Same as Current Password';
          this.ShowAlert(true);
          this.timeout(false);
        } else if (res['key'] === 'oldsame') {
          // Same as Previous Password
          this.errorMessage = 'Same as Previous Password';
          this.ShowAlert(true);
          this.timeout(false);
        } else if (res['key'] === 'false') {
          // Server Error
          this.errorMessage = 'Server Error';
          this.ShowAlert(true);
          this.timeout(false);
        } else {
          this.successMessage = 'Password changed succesfully';
          this.ShowAlertS(true);
          this.timeoutS(false);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  Sleep() {

    if (this.loginAuth.getUserType() === 'seller') {
      localStorage.setItem('SleepUsername', this.loginAuth.getEmail());
      localStorage.setItem('SleepType', 'seller');
      localStorage.removeItem('sessionShopUserID');
      localStorage.removeItem('sessionShopName');
      localStorage.removeItem('sessionShopEmail');
      localStorage.removeItem('sessionShopUserType');
      localStorage.setItem('SloggedIn', 'false');
      this.loginAuth.setSUserLoggedIn(false);
      this.router.navigate(['lockscreen']);
    } else {
      localStorage.setItem('SleepUsername', this.loginAuth.getEmail());
      localStorage.setItem('SleepType', 'superadmin');
      localStorage.removeItem('sessionUserID');
      localStorage.removeItem('sessionName');
      localStorage.removeItem('sessionEmail');
      localStorage.removeItem('sessionUserType');
      localStorage.setItem('loggedIn', 'false');
      this.loginAuth.setUserLoggedIn(false);
      this.router.navigate(['lockscreen']);
    }

    // this.loginAuth
    //   .setServerLogout(this.loginAuth.getEmail(), this.loginAuth.getUserType())
    //   .subscribe(
    //     res => {
    //       if (res.json()['key'] === 'true') {
    //         localStorage.removeItem('sessionUserID');
    //         localStorage.removeItem('sessionName');
    //         localStorage.removeItem('sessionEmail');
    //         localStorage.removeItem('sessionUserType');
    //         localStorage.setItem('loggedIn', 'false');
    //         this.loginAuth.setUserLoggedIn(false);
    //         this.router.navigate(['lockscreen']);
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  }

  logout() {
    if (this.loginAuth.getUserType() === 'seller') {
      localStorage.removeItem('sessionUserID');
      localStorage.removeItem('sessionName');
      localStorage.removeItem('sessionEmail');
      localStorage.removeItem('sessionUserType');
      localStorage.setItem('loggedIn', 'false');
      this.loginAuth.setUserLoggedIn(false);
      this.router.navigate(['login']);
    } else {
      localStorage.removeItem('sessionShopUserID');
      localStorage.removeItem('sessionShopName');
      localStorage.removeItem('sessionShopEmail');
      localStorage.removeItem('sessionShopUserType');
      localStorage.setItem('SloggedIn', 'false');
      this.loginAuth.setSUserLoggedIn(false);
      this.router.navigate(['login']);
    }

    // this.loginAuth
    //   .setServerLogout(this.loginAuth.getEmail(), this.loginAuth.getUserType())
    //   .subscribe(
    //     res => {
    //       if (this.loginAuth.getUserType() === 'seller') {
    //         if (res.json()['key'] === 'true') {
    //           localStorage.removeItem('sessionUserID');
    //           localStorage.removeItem('sessionName');
    //           localStorage.removeItem('sessionEmail');
    //           localStorage.removeItem('sessionUserType');
    //           localStorage.setItem('loggedIn', 'false');
    //           this.loginAuth.setUserLoggedIn(false);
    //           this.router.navigate(['login']);
    //         }
    //       } else {
    //         if (res.json()['key'] === 'true') {
    //           localStorage.removeItem('sessionShopUserID');
    //           localStorage.removeItem('sessionShopName');
    //           localStorage.removeItem('sessionShopEmail');
    //           localStorage.removeItem('sessionShopUserType');
    //           localStorage.setItem('SloggedIn', 'false');
    //           this.loginAuth.setSUserLoggedIn(false);
    //           this.router.navigate(['login']);
    //         }
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  }
}
