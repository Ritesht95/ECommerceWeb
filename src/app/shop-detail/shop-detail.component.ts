import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminService } from '../services/super-admin.service';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  private shopDetailID: number;
  shopData: any = '';
  env = environment.apiURL;

  constructor(private actRoute: ActivatedRoute, private superadminservice: SuperAdminService) {
    this.actRoute.queryParams.subscribe(params => {
      this.shopDetailID = params['shopID'];
    });
  }

  ngOnInit() {
    this.superadminservice.getShopDetails(this.shopDetailID).subscribe(
      res => {
        this.shopData = res;
      }
    );
  }
}
