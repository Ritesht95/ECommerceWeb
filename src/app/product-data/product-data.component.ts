import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {

  productsData: any;
  productSingleData: any = '';
  env = environment.apiURL;


  constructor(private sellerservice: SellerService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.sellerservice.getAllProducts(this.loginAuth.getSUserID()).subscribe(
      res => {
        this.productsData = res['records'];
      }
    );
  }

  getSingleProduct(ProductID: string) {
    this.sellerservice.getSingleProduct(ProductID).subscribe(
      res => {
        this.productSingleData = res;
      }
    );
  }

  AddStock(ProductID: string, Stock: number) {
    this.sellerservice.addStock(ProductID, Stock).subscribe(
      res => {
        if (res['key'] === 'true') {
          console.log('stock updated successfully.');
          document.getElementById('btnCloseStock').click();
          this.sellerservice.getAllProducts(this.loginAuth.getSUserID()).subscribe(
            res1 => {
              this.productsData = res1['records'];
            }
          );
        } else  {
          console.log('cannot update stock.');
        }
      }
    );
  }

}
