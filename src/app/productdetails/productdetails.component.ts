import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private sellerservice: SellerService,
    private actRoute: ActivatedRoute
  ) {}

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
    Object.keys(FormValues).forEach(element => {
      const obj = {
        ID: element.substr(3, element.length),
        Value: FormValues[element]
      };
      this.dataToSend.push(obj);
    });
    this.sellerservice
      .setProductProperties(this.productID, this.dataToSend, this.operation)
      .subscribe(res => {
        console.log(res);
      });
  }
}
