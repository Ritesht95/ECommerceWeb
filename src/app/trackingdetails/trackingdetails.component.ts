import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-trackingdetails',
  templateUrl: './trackingdetails.component.html',
  styleUrls: ['./trackingdetails.component.css']
})
export class TrackingdetailsComponent implements OnInit {

  orderDetailsID = '';
  trackingData = '';
  flag = false;

  constructor(private sellerservice: SellerService, private actRoute: ActivatedRoute, private loginAuth: LoginauthService) { }

  ngOnInit() {
    document.getElementById('divAlert').style.display = 'none';
    this.actRoute.queryParams.subscribe(params => {
      this.orderDetailsID = params['ODID'];
    });
    console.log(this.orderDetailsID);
    if (this.orderDetailsID === undefined) {
      document.getElementById('divTimeline').style.display = 'none';
    } else {
      this.track(this.orderDetailsID);
    }

  }

  track(OrderDetailsID: string) {
    this.sellerservice.getTrackingDetails(OrderDetailsID, this.loginAuth.getSUserID()).subscribe(
      res => {
        if (res['key'] === 'false') {
          document.getElementById('divAlert').style.display = 'block';
          document.getElementById('divTimeline').style.display = 'none';
        } else {
          document.getElementById('divTimeline').style.display = 'block';
          document.getElementById('divAlert').style.display = 'none';
          this.trackingData = res['records'];
          res['records'].forEach(element => {
            if (element['Status'] === 'Delievered') {
              this.flag = true;
            }
          });
        }
      }
    );
  }
}
