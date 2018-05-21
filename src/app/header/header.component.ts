import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdmin } from '../classes/super-admin';
import { SuperAdminService } from '../services/super-admin.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AdminprofileComponent } from '../adminprofile/adminprofile.component';
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
  headerComp: AdminprofileComponent = new AdminprofileComponent(
    this.superadminservice,
    this.loginAuth,
    this.elem,
    this.router
  );
  sidebarComp: SidebarComponent = new SidebarComponent(
    this.loginAuth,
    this.superadminservice
  );


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
    console.log('sddvjsdk');
    this.superadminservice.getAdminData(this.loginAuth.getUserID()).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      res => {
        this.adminData = res;
        document.getElementById('userImage').src = environment.apiURL + 'Assets/AdminImages/' +  this.adminData.AdminImage;
        document.getElementById('userHeaderImage').src = environment.apiURL + 'Assets/AdminImages/' +  this.adminData.AdminImage;
        console.log(res);
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    this.superAdminService.changePassword(oldPassword, newPassword).subscribe(
      res => {
        if (res['key'] === 'incorrect') {
          // Wrong old Password
          console.log('Wrong old Password');
        } else if (res['key'] === 'same') {
          // Same as Current Password
          console.log('Same as Current Password');
        } else if (res['key'] === 'oldsame') {
          // Same as Previous Password
          console.log('Same as Previous Password');
        } else if (res['key'] === '0') {
          // Server Error
          console.log('Server Error');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateImage() {
    this.superadminservice.updateProfileImage(this.formData).subscribe(res => {
      console.log(res);
      if (res['key'] === 'true') {
        this.superadminservice
          .getAdminData(this.loginAuth.getUserID())
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            res => {
              this.adminData = res;
              document.getElementById('profileImageIn').src =
                environment.apiURL +
                'Assets/AdminImages/' +
                this.adminData.AdminImage;
                document.getElementById('userHeaderImage').src = environment.apiURL + 'Assets/AdminImages/' +  this.adminData.AdminImage;
              this.sidebarComp.ngOnInit();
            }
          );
      }
    });
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
