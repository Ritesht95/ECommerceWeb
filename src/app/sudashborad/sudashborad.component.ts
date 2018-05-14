import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-sudashborad',
  templateUrl: './sudashborad.component.html',
  styleUrls: ['./sudashborad.component.css']
})
export class SudashboradComponent implements OnInit {

  UserID: number;
  Name: string;

  constructor(private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.UserID = this.loginAuth.getUserID();
    this.Name = this.loginAuth.getName();
  }

}
