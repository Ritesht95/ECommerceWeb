import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../services/super-admin.service';
import { LoginauthService } from '../loginauth.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: any;

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
            console.log('sucessfully send');
            this.ngOnInit();
        } else {
          console.log('error');
        }
      }
    );
  }

}
