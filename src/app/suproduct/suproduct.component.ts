import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SuperAdminService } from '../services/super-admin.service';
import { SellerService } from '../services/seller.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-suproduct',
  templateUrl: './suproduct.component.html',
  styleUrls: ['./suproduct.component.css']
})
export class SuproductComponent implements OnInit {

  productsData: any;
  productSingleData: any = '';
  env = environment.apiURL;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categoryProperties = '';
  NoOfTrigger = 0;

  constructor(private superadminservice: SuperAdminService, private sellerservice: SellerService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: []
    };
    this.superadminservice.getAllProducts().subscribe(
      res => {
        this.productsData = res['records'];
        if (this.NoOfTrigger === 0) {
          this.dtTrigger.next();
          this.NoOfTrigger++;
        }
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

  setApproved(ProductID: string, Value: boolean) {
    this.superadminservice.setProductApproved(ProductID, Value).subscribe(
      res => {
        if (res['key'] === 'true') {
          this.ngOnInit();
        } else {
          console.log('cannot approve or disapprove category.');
        }
      }
    );
  }

  getProperty(cid: any, pid: any) {

    this.sellerservice
    .getCategoryProperties(cid, pid)
    .subscribe(res => {
      this.categoryProperties = res['records'];
    });
    this.sellerservice.getSingleProduct(pid).subscribe(res => {
      this.productSingleData = res;
    });
  }

}
