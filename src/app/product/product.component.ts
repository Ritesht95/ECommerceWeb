import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SellerService } from '../services/seller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginauthService } from '../loginauth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  flag: boolean;
  filesToUpload: string[] = [];
  formData: FormData = new FormData();
  webInfo: any;
  categoriesData: any = '';
  productID = '';
  singleProductData = '';
  updateCategoryID = '';
  env = environment.apiURL;

  imgURL: String = '../../assets/img/avatar.png';
  // FileToUpload: File = null;
  urls = new Array<string>();

  // tslint:disable-next-line:max-line-length
  constructor(
    private elem: ElementRef,
    private sellerservice: SellerService,
    private router: Router,
    private loginAuth: LoginauthService,
    private actRoute: ActivatedRoute
  ) {}

  validateFile(name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (
      ext.toLowerCase() === 'png' ||
      ext.toLowerCase() === 'jpg' ||
      ext.toLowerCase() === 'jpeg'
    ) {
      this.flag = false;
      return true;
    } else {
      this.flag = true;
      return false;
    }
  }

  imagePreview(event: any) {
    this.urls = [];
    const files = event.target.files;
    console.log(files);
    let cnt = 0;
    if (files.length <= 4) {
      for (const file of files) {
        // tslint:disable-next-line:no-shadowed-variable
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        if (!this.validateFile(file.name)) {
          console.log('Selected file format is not supported');
          return false;
        } else {
          this.formData.append('image' + cnt++, file, file.name);
          this.filesToUpload.push(file);
        }
        reader.readAsDataURL(file);
      }
    }
  }
  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.productID = params['ProdID'];
    });
    if (this.productID === '') {

    } else {
      this.sellerservice.getSingleProduct(this.productID).subscribe(
        res => {
          this.singleProductData = res;
          this.updateCategoryID = res.CategoryID;
        }
      );
    }
    this.sellerservice
      .getAllCategories(this.loginAuth.getSUserID())
      .subscribe(res => {
        this.categoriesData = res['records'];
      });
  }

  // tslint:disable-next-line:max-line-length
  AddProduct(
    PName: string,
    Description: string,
    LogoAlt: string,
    Unit: string,
    Price: string,
    MinStock: string,
    CategoryID: string,
    ProductID: string
  ) {
    this.formData.append('ProductName', PName);
    if (CategoryID === undefined) {
      this.formData.append('CategoryID', this.updateCategoryID);
    } else {
      this.formData.append('CategoryID', CategoryID);
    }

    if (ProductID === undefined) {
      this.formData.append('ProductID', 'new');
    } else {
      this.formData.append('ProductID', ProductID);
    }
    this.formData.append('ProductDesc', Description);
    this.formData.append('Unit', Unit);
    this.formData.append('LogoAlt', LogoAlt);
    this.formData.append('Price', Price);
    this.formData.append('MinStock', MinStock);
    this.sellerservice.addProduct(this.formData).subscribe(res => {
      if (res['key'] === 'true') {
        this.router.navigate(['productData']);
      } else if (res['key'] === 'nup') {
        console.log('Product added. But,images cannot be uploaded.');
      } else if (res['key'] === 'false') {
        console.log('Product cannot be added.');
      } else if (res['key'] === 'overflow') {
        console.log('You cannot add more than 4 images for a Product.');
      }
    });
  }
}
