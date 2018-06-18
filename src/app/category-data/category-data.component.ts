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

  NoOfTrigger = 0;
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
<<<<<<< HEAD

    // get user id

    this.sellerservice.getAllCategories(this.loginAuth.getSUserID()).subscribe(
=======
    this.sellerservice.getAllShopCategories(this.loginAuth.getSUserID()).subscribe(
>>>>>>> 9dd5c1792e0b1b975feb89128d0dbed5305dc075
      res => {
        this.categoryData = res['records'];
        if (this.NoOfTrigger === 0) {
          this.dtTrigger.next();
          this.NoOfTrigger++;
        }
      }
    );
  }

}
