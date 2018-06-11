import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  categoryProperties = '';
  categoryID = '';
  productID = '';
  dataToSend = [];
  productSingleData: any = '';
  operation = '';
  ErrorMsg = null;

  timeout(val: boolean) {
    setTimeout(this.ShowAlert, 5000, val);
  }

  ShowAlert(val: boolean) {
    const alertDiv = document.getElementById('alertDivProp');
    alertDiv.style.display = val ? 'block' : 'none';
  }


  constructor(
    private sellerservice: SellerService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.productID = params['ProdID'];
      this.categoryID = params['CatID'];
    });
    this.sellerservice.getSingleProduct(this.productID).subscribe(res => {
      this.productSingleData = res;
    });
    this.sellerservice
      .getCategoryProperties(this.categoryID, this.productID)
      .subscribe(res => {
        this.categoryProperties = res['records'];
        this.operation = res['operation'];
      });
  }

  AddProValues(FormValues: Object) {
    this.dataToSend = [];
    let cnt = 0;
    Object.keys(FormValues).forEach(element => {
      if (cnt % 2 != 0) {
        const obj = {
          ID: element.substr(3, element.length),
          Value: FormValues['txt' + element.substr(3, element.length)],
          Operation: FormValues['hdn' + element.substr(3, element.length)]
        };
        this.dataToSend.push(obj);
      }
      cnt++;
    });
    this.sellerservice
      .setProductProperties(this.productID, this.dataToSend, this.operation)
      .subscribe(res => {
        if (res['key'] === 'true') {
          this.router.navigate(['/productData']);
        } else {
          this.ErrorMsg = 'Something Went Wrong. Try Again Later...!!!!';
          this.ShowAlert(true);
          this.timeout(false);
        }

      });
  }
}
