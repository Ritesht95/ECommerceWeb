import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})

export class UserdataComponent implements OnInit {
  usersData: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  env = environment.apiURL;

  constructor(private superadminservice: SuperAdminService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.superadminservice.getAllUsers().subscribe(
      res => {
        this.usersData = res['records'];
        this.dtTrigger.next();
      }
    );
  }

  SetInactive(UserID: string) {
    this.superadminservice.setUserStatus(UserID, '0').subscribe(
      res => {
        this.superadminservice.getAllUsers().subscribe(
          res1 => {
            this.usersData = res1['records'];
          }
        );
      }
    );
  }

  SetActive(UserID: string) {
    this.superadminservice.setUserStatus(UserID, '1').subscribe(
      res => {
        this.superadminservice.getAllUsers().subscribe(
          res1 => {
            this.usersData = res1['records'];
          }
        );
      }
    );
  }

}
