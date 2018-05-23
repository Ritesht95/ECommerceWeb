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
  shopsDataN: any;

  constructor(private superadminservice: SuperAdminService) {

  }

  ngOnInit() {
    this.superadminservice.getShopsData().subscribe(
      res => {
        this.shopsData = '';
        this.shopsData = res['records'];
      }
    );

    this.superadminservice.getNewShops().subscribe(
      res => {
        console.log('newData');
        this.shopsDataN = '';
        this.shopsDataN = res['records'];
      }
    );
  }

  SetActive(ShopID: number) {
    this.superadminservice.setShopStatus(ShopID, 1).subscribe(
      res => {
        this.ngOnInit();
      }
    );

  }

  SetInactive(ShopID: number) {
    this.superadminservice.setShopStatus(ShopID, 0).subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  SetApproved(ShopID: number) {
    this.superadminservice.setShopApproveStatus(ShopID, 1).subscribe(
      res => {
        this.ngOnInit();
      }
    );

  }

  SetNApproved(ShopID: number) {
    this.superadminservice.setShopApproveStatus(ShopID, 0).subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  SetShopDelete(ShopID: number) {
    this.superadminservice.setShopDelete(ShopID).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.ngOnInit();
        }
      }
    );
  }

}
