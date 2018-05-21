import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  adminData: any;
  Name: string;

  constructor(private loginAuth: LoginauthService, private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.Name = this.loginAuth.getName();
    this.superadminservice.getAdminData(this.loginAuth.getUserID()).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      res => {
        this.adminData = res;
        document.getElementById('profileImage').src = environment.apiURL + 'Assets/AdminImages/' +  this.adminData.AdminImage;
        console.log(res);
      }
    );
  }

}
