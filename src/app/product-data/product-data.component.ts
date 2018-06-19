import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  productsData: any = [];
  productSingleData: any = '';
  env = environment.apiURL;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categoryProperties = '';
  operation = '';
  categoryID = '';
  productID = '';
  NoOfTrigger = 0;

  constructor(
    private sellerservice: SellerService,
    private loginAuth: LoginauthService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.sellerservice
      .getAllProducts(this.loginAuth.getSUserID())
      .subscribe(res => {
        this.productsData = res['records'];
        if (this.NoOfTrigger === 0) {
          this.dtTrigger.next();
          this.NoOfTrigger++;
        }
      });
  }

  getSingleProduct(ProductID: string) {
    this.sellerservice.getSingleProduct(ProductID).subscribe(res => {
      this.productSingleData = res;
    });
  }

  // add stock

  AddStock(ProductID: string, Stock: number) {
    this.sellerservice.addStock(ProductID, Stock).subscribe(res => {
      if (res['key'] === 'true') {
        console.log('stock updated successfully.');
        document.getElementById('btnCloseStock').click();
        this.ngOnInit();
      } else {
        alert('Mimimum Stock is Required');
        this.ngOnInit();
      }
    });
  }

  // delete image

  deleteImage(ProductID: string, ID: number) {
    this.sellerservice.deleteImage(ID).subscribe(res => {
      if (res['key'] === 'true') {
        this.getSingleProduct(ProductID);
      } else {
        console.log('Cannot delete the image');
      }
    });
  }

<<<<<<< HEAD
<<<<<<< HEAD
 // get property detail
=======
  SetActive(pid: any) {
    this.sellerservice.setProductActive(pid, '1').subscribe(res => {
      this.ngOnInit();
    });
  }

  SetInactive(pid: any) {
    this.sellerservice.setProductActive(pid, '0').subscribe(res => {
      this.ngOnInit();
    });
  }
>>>>>>> 9dd5c1792e0b1b975feb89128d0dbed5305dc075
=======
 // get property detail
>>>>>>> comment done

  getProperty(cid: any, pid: any) {
    this.categoryID = cid;
    this.productID = pid;
    console.log(this.categoryID, this.productID);
    this.sellerservice
      .getCategoryProperties(this.categoryID, this.productID)
      .subscribe(res => {
        this.categoryProperties = res['records'];
      });
    this.sellerservice.getSingleProduct(this.productID).subscribe(res => {
      this.productSingleData = res;
    });
  }
}
