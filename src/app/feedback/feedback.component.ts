import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';

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

  constructor(private superadminservice: SuperAdminService) { }

  ngOnInit() {
    this.superadminservice.getFeedback().subscribe(
      res => {
        this.feedback = '';
        this.feedback = res['records'];
      }
    );
  }

  // send reply

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
