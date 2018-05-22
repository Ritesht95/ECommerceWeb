import {ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shopsData: any;

  constructor(private superadminservice: SuperAdminService) {

  }

  ngOnInit() {
    this.superadminservice.getShopsData().subscribe(
      res => {
        this.shopsData = res['records'];
      }
    );
  }

}
