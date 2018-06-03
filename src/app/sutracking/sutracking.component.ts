import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sutracking',
  templateUrl: './sutracking.component.html',
  styleUrls: ['./sutracking.component.css']
})
export class SutrackingComponent implements OnInit {

  private orderDetailsID = '';
  trackingData = '';
  flag = false;

  constructor(private superadminservice: SuperAdminService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.orderDetailsID = params['ODID'];
    });
    this.superadminservice.getTrackingDetails(this.orderDetailsID).subscribe(
      res => {
        this.trackingData = res['records'];
        res['records'].forEach(element => {
          if (element['Status'] === 'Delievered') {
            this.flag = true;
          }
        });
      }
    );
  }

}
