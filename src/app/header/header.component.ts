import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  UserID: number;
  Name: string;

  constructor(private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.UserID = this.loginAuth.getUserID();
    this.Name = this.loginAuth.getName();
  }

}
