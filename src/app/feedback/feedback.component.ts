import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback: any;
  Feedback: string;
  Id: number;
  Reply: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  NoOfTrigger = 0;

  constructor(private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: []
    };
    this.superadminservice.getFeedback().subscribe(
      res => {
        this.feedback = '';
        this.feedback = res['records'];
        if (this.NoOfTrigger === 0) {
          this.dtTrigger.next();
          this.NoOfTrigger++;
        }
      }
    );
  }

  sendReply(Subject: string , Reply: string) {
    this.superadminservice.sendReply(this.Id, Subject, Reply).subscribe(
      res => {
        if (res['key'] === 'true') {
            console.log('sucessfully send reply');
            document.getElementById('btnClose').click();
            this.ngOnInit();
        } else {
          console.log('error');
        }
      }
    );

  }

  getSingleFeedback(Id: number, Feedback: string) {
    this.Id = Id;
    this.Feedback = Feedback;
  }

  getReply(Reply: string) {
    this.Reply = Reply;
  }

}
