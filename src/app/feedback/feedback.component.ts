import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback: any;

  constructor(private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.superadminservice.getFeedback().subscribe(
      res => {
        this.feedback = '';
        this.feedback = res['records'];
      }
    );
  }

}
