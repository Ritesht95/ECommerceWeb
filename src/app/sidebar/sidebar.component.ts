import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  Name: string;

  constructor(private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.Name = this.loginAuth.getName();
  }

}
