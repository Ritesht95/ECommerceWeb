import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  adminData: any;

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

  hideButton() {
    document.getElementById('btnEC').style.display = 'block';
    document.getElementById('btnSave').style.display = 'none';
    document.getElementById('btnCancel').style.display = 'none';
    document.getElementById('tableDetail2').style.display = 'none';
    document.getElementById('tableDetail').style.display = 'table';
  }

  updateProfile(Name: string, PhoneNo: string, Email: string) {
    this.hideButton();
    this.superadminservice.setAdminData(this.loginAuth.getUserID(), Name, PhoneNo, Email).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  constructor(private superadminservice: SuperAdminService, private loginAuth: LoginauthService) {}

  ngOnInit() {
    this.superadminservice.getAdminData(this.loginAuth.getUserID()).subscribe(
      res => {
        this.adminData = res;
        console.log(res);
      }
    );
  }
}
