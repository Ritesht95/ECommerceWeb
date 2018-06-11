import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shopsData: any;
  shopsDataN: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  NoOfTrigger = 0;

  constructor(private superadminservice: SuperAdminService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.superadminservice.getShopsData().subscribe(res => {
      if (res['key'] !== 'false') {
        this.shopsData = '';
        this.shopsData = res['records'];
        if (this.NoOfTrigger === 0) {
          this.dtTrigger.next();
          this.NoOfTrigger++;
        }
      } else {
        document.getElementById('tableShops').style.display = 'none';
      }
    });

    this.superadminservice.getNewShops().subscribe(res => {
      if (res['key'] !== 'false') {
        this.shopsDataN = '';
        this.shopsDataN = res['records'];
      } else {
        document.getElementById('tableNewShops').style.display = 'none';
      }
    });
  }

  SetActive(ShopID: number) {
    this.superadminservice.setShopStatus(ShopID, 1).subscribe(res => {
      this.ngOnInit();
    });
  }

  SetInactive(ShopID: number) {
    this.superadminservice.setShopStatus(ShopID, 0).subscribe(res => {
      this.ngOnInit();
    });
  }

  SetApproved(ShopID: number) {
    this.superadminservice.setShopApproveStatus(ShopID, 1).subscribe(res => {
      this.ngOnInit();
    });
  }

  SetNApproved(ShopID: number) {
    this.superadminservice.setShopApproveStatus(ShopID, 0).subscribe(res => {
      this.ngOnInit();
    });
  }

  SetShopDelete(ShopID: number) {
    this.superadminservice.setShopDelete(ShopID).subscribe(res => {
      if (res['key'] === 'true') {
        this.ngOnInit();
      }
    });
  }
}
