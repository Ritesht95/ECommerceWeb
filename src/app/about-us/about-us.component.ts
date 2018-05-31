import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  webInfo: any;
  contact() {
    this.router.navigate(['contactUs']);
  }

  constructor(private router: Router, private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.superadminservice.getWebInfo().subscribe(
      res => {
        this.webInfo = res;
      }
    );
  }



}
