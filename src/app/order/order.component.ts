import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { LoginauthService } from '../loginauth.service';
import { SellerService } from '../services/seller.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: any = '';
  customer: any = '';
  productSingleData: any = '';
  env = environment.apiURL;

  constructor(private sellerservice: SellerService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.sellerservice.getOrder( this.loginAuth.getSUserID() ).subscribe(
      res => {
        this.order = '';
        this.order = res['records'];
      }
    );
  }

  sendOrderId(orderid: number) {
    console.log(orderid);
    this.sellerservice.sendOrder(orderid).subscribe(
      res => {
        if (res['key'] === 'true') {
            this.ngOnInit();
        }else {
          console.log('error');
        }
      }
    );
  }

  getCustomer(oid: number, cid: number) {
    console.log(oid, cid);
    this.sellerservice.getCustomerDetail(oid, cid).subscribe(
      res => {
        if (res['key'] === 'true') {
            console.log('sucessfully send oid and cid');
            this.customer = '';
            this.customer = res;
        } else {
          console.log('error');
        }
      }
    );
  }

  getSingleProduct(ProductID: string) {
    this.sellerservice.getSingleProduct(ProductID).subscribe(res => {
      this.productSingleData = res;
    });
  }

}
