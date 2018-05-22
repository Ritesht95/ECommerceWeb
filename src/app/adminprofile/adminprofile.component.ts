import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HeaderComponent } from '../header/header.component';
import { LoginauthService } from '../loginauth.service';
import { SuperAdminService } from '../services/super-admin.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  flag: boolean;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  adminData: any;
  headerComp: HeaderComponent = new HeaderComponent(
    this.loginAuth,
    this.superadminservice,
    this.elem,
    this.router
  );
  sidebarComp: SidebarComponent = new SidebarComponent(
    this.loginAuth,
    this.superadminservice
  );

  hideTable() {
    const x = document.getElementById('tableDetail');
    const y = document.getElementById('tableDetail2');
    const btn1 = document.getElementById('btnSave');
    const btn2 = document.getElementById('btnCancel');
    const btn3 = document.getElementById('btnEC');
    if (x.style.display === 'none') {
      x.style.display = 'table';
      y.style.display = 'none';
      btn1.style.display = 'none';
      btn2.style.display = 'none';
      btn3.style.display = 'block';
    } else {
      x.style.display = 'none';
      y.style.display = 'table';
      btn1.style.display = 'inline';
      btn2.style.display = 'inline';
      btn3.style.display = 'none';
    }
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

  // tslint:disable-next-line:max-line-length
  constructor(
    private superadminservice: SuperAdminService,
    private loginAuth: LoginauthService,
    private elem: ElementRef,
    private router: Router
  ) {
    this.adminData = '';
  }

  hideButton() {
    document.getElementById('btnEC').style.display = 'block';
    document.getElementById('btnSave').style.display = 'none';
    document.getElementById('btnCancel').style.display = 'none';
    document.getElementById('tableDetail2').style.display = 'none';
    document.getElementById('tableDetail').style.display = 'table';
  }

  updateImage() {
    this.superadminservice.updateProfileImage(this.formData).subscribe(res => {
      if (res['key'] === 'true') {
        this.superadminservice
          .getAdminData(this.loginAuth.getUserID())
          .subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            res => {
              this.adminData = res;

              document
                .getElementById('profileImageIn')
                .setAttribute(
                  'src',
                  environment.apiURL +
                    'Assets/AdminImages/' +
                    this.adminData.AdminImage
                );
              this.headerComp.ngOnInit();
              this.sidebarComp.ngOnInit();
            }
          );
      }
    });
  }

  updateProfile(Name: string, PhoneNo: string, Email: string) {

    this.superadminservice
      .setAdminData(this.loginAuth.getUserID(), Name, PhoneNo, Email)
      .subscribe(res => {
        if (res['key'] === 'true') {
          this.superadminservice
            .getAdminData(this.loginAuth.getUserID())
            .subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              res => {
                this.adminData = res;
                this.loginAuth.setValues(
                  this.loginAuth.getUserID(),
                  this.adminData.Email,
                  this.loginAuth.getUserType(),
                  this.adminData.Adminname
                );
                this.headerComp.ngOnInit();
                this.sidebarComp.ngOnInit();
              }
            );
        }
      });
      this.hideButton();
  }

  ngOnInit() {
    this.superadminservice
      .getAdminData(this.loginAuth.getUserID())
      .subscribe(res => {
        this.adminData = res;
        document
          .getElementById('profileImageIn')
          .setAttribute(
            'src',
            environment.apiURL +
              'Assets/AdminImages/' +
              this.adminData.AdminImage
          );
      });
  }
}
