import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdmin } from '../classes/super-admin';
import { SuperAdminService } from '../services/super-admin.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fileToUpload: File = null;
  formData: FormData = new FormData();
  adminData: any;
  UserID: number;
  Name: string;
  flag: boolean;
  errorMessage: string;
  successMessage: string;

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
    document.getElementById('txtNewPassword').value = '';
    document.getElementById('txtCPassword').value = '';
    document.getElementById('txtOldPassword').value = '';
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
            this.router.navigate(['login']);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
