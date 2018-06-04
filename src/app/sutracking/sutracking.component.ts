import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sutracking',
  templateUrl: './sutracking.component.html',
  styleUrls: ['./sutracking.component.css']
})
export class SutrackingComponent implements OnInit {

  orderDetailsID = '';
  trackingData = '';
  flag = false;

  constructor(private superadminservice: SuperAdminService, private actRoute: ActivatedRoute) { }

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
    this.superadminservice.getTrackingDetails(OrderDetailsID).subscribe(
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
