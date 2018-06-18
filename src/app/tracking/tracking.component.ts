import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SellerService } from '../services/seller.service';
import { environment } from '../../environments/environment';
import { SuperAdminService } from '../services/super-admin.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  order: any = '';
  customer: any = '';
  productSingleData: any = '';
  env = environment.apiURL;
  id: number;
  adate: string ;
  ddate: string ;
  dtime: string ;
  atime: string ;
  NoOfTrigger = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private superadminservice: SuperAdminService, private sellerservice: SellerService, private loginAuth: LoginauthService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [0,'desc']
    };
    this.superadminservice.getOrder().subscribe(
      res => {
        this.order = '';
        this.order = res['records'];
        if (this.NoOfTrigger === 0) {
          this.dtTrigger.next();
          this.NoOfTrigger++;
        }
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

  testId(n: number) {
    this.id = n;
  }

  sendTracking(text: string) {
    this.adate = (<HTMLInputElement>document.getElementById('datepicker1')).value;
    this.ddate = (<HTMLInputElement>document.getElementById('datepicker2')).value ;
    this.atime = (<HTMLInputElement>document.getElementById('timepicker1')).value ;
    this.dtime = (<HTMLInputElement>document.getElementById('timepicker2')).value ;
    console.log(this.id, text, this.adate, this.ddate, this.atime, this.dtime);
    this.superadminservice.sendTracking(this.id, text, this.adate, this.atime, this.ddate, this.dtime).subscribe(
      res => {
        if (res['key'] === 'true') {
            console.log('sucessfully send');
            this.ngOnInit();
        } else {
          console.log('error');
        }
      }
    );
    this.ngOnInit();
  }

  sendShipped(OrderDetailID: number) {
    console.log(OrderDetailID);
    this.superadminservice.sendShipped(OrderDetailID).subscribe(
      res => {
        if (res['key'] === 'true') {
            this.ngOnInit();
        }  else if (res['key'] === 'noaccess') {
          alert('Order Has not been Confirmed BY the Seller.');
        } else {
          console.log('error');
        }
      }
    );
    this.ngOnInit();
  }

  sendDelievered(OrderDetailID: number) {
    console.log(OrderDetailID);
    this.superadminservice.sendDelievered(OrderDetailID).subscribe(
      res => {
        if (res['key'] === 'true') {
            this.ngOnInit();
        } else if(res['key'] === 'noaccess'){
          alert("Order Has not been Out For Delivery Yet.");
        }else {
          console.log('error');
        }
      }
    );
    this.ngOnInit();
  }

  sendOFD(OrderDetailID: number) {
    console.log(OrderDetailID);
    this.superadminservice.sendOFD(OrderDetailID).subscribe(
      res => {
        if (res['key'] === 'true') {
            this.ngOnInit();
        } else if(res['key'] === 'noaccess'){
          alert("Order Has not been Shipped Yet.");
        }else {
          console.log('error');
        }
      }
    );
    this.ngOnInit();
  }

}
