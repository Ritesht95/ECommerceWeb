import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment';
import { LoginauthService } from '../loginauth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  WebInfo: any;
  infoEmail: any;
  user: any;
  email: any;

  constructor(private superadminservice: SuperAdminService, private loginAuth: LoginauthService, private router: Router) { }

  ngOnInit() {
    this.superadminservice.getWebInfo().subscribe( res => {
      this.WebInfo = res;
    });

    this.superadminservice.getMailInfo().subscribe(
      res => {
        console.log(res);
        this.infoEmail = res;
      }
    );

    this.user = this.loginAuth.getSName();
    this.email = this.loginAuth.getEmail();
  }

  sendFeedback(Email: string, Message: string) {
    this.superadminservice.sendMessage(this.user, Email, Message).subscribe(
      res => {
        if (res['key'] === 'true') {
            console.log('sucessfully send feedback');
        } else {
          console.log('error');
        }
      }
    );
    this.router.navigate(['shopdashboard']);
  }

}
