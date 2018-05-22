import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperAdminService } from '../services/super-admin.service';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-web-info',
  templateUrl: './web-info.component.html',
  styleUrls: ['./web-info.component.css']
})
export class WebInfoComponent implements OnInit {
  flag: boolean;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  webInfo: any;

  constructor(
    private superadminservice: SuperAdminService,
    private elem: ElementRef,
    private loginAuth: LoginauthService
  ) {}

  upload(event: any) {
    const files = this.elem.nativeElement.querySelector('#imageWebInfo').files;
    this.formData.append('image', files[0], files[0].name);
    this.formData.append('Id', '1');
    if (!this.validateFile(files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    } else {
      this.fileToUpload = files.item(0);
    }
  }

  validateFile(name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
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

  AddWebInfoDetails(LogoAlt) {
    this.formData.append('LogoAlt', LogoAlt);
    this.superadminservice.postFile(this.formData).subscribe(
      res => {
        if (res['key'] === 'true') {
          // tslint:disable-next-line:no-shadowed-variable
          this.superadminservice.getWebInfo().subscribe(res => {
            if (res['key'] === 'false') {
              this.webInfo = res;
            } else {
              this.webInfo = res;
              document
                .getElementById('profileImageIn')
                .setAttribute(
                  'src',
                  environment.apiURL + 'Assets/WebsiteLogo/' + this.webInfo.Logo
                );
              document
                .getElementById('profileImageIn')
                .setAttribute('alt', this.webInfo.LogoAlt);
            }
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateWebInfo(
    WebsiteName,
    Contact,
    GSTNo,
    TagLine,
    AboutUs,
    ContactUs,
    FacebookLink,
    TwitterLink,
    InstagramLink,
    YoutubeLink,
    Id
  ) {
    this.superadminservice
      .updateWebInfo(
        WebsiteName,
        Contact,
        GSTNo,
        TagLine,
        AboutUs,
        ContactUs,
        FacebookLink,
        TwitterLink,
        InstagramLink,
        YoutubeLink,
        Id
      )
      .subscribe(res => {
        if (res['key'] === 'true') {
        } else {
        }
      });
  }

  ngOnInit() {
    this.superadminservice.getWebInfo().subscribe(res => {
      if (res['key'] === 'false') {
        this.webInfo = res;
      } else {
        this.webInfo = res;
        document
          .getElementById('profileImageIn')
          .setAttribute(
            'src',
            environment.apiURL + 'Assets/WebsiteLogo/' + this.webInfo.Logo
          );
        document
          .getElementById('profileImageIn')
          .setAttribute('alt', this.webInfo.LogoAlt);
      }
    });
  }
}
