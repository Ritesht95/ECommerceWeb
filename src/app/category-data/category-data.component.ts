import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrls: ['./category-data.component.css']
})
export class CategoryDataComponent implements OnInit {

  categoryData: any;
  env: any = environment.apiURL;

  constructor(private sellerservice: SellerService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.sellerservice.getAllCategories(this.loginAuth.getSUserID()).subscribe(
      res => {
        this.categoryData = res['records'];
      }
    );

  }

}
