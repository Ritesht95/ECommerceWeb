import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrls: ['./category-data.component.css']
})
export class CategoryDataComponent implements OnInit {

  categoryData: any;
  env: any = environment.apiURL;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private sellerservice: SellerService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.sellerservice.getAllShopCategories(this.loginAuth.getSUserID()).subscribe(
      res => {
        this.categoryData = res['records'];
        this.dtTrigger.next();
      }
    );
  }

}
