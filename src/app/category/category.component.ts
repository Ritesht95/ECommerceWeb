import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SellerService } from '../services/seller.service';
import { LoginauthService } from '../loginauth.service';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  flag: boolean;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  categoryData: any = '';
  categoryID = 0;
  updateID = 'new';
  public propertyData: any = '';
  public propertiesData = Array<{ ID: string, PropertyName: string, PropertyDesc: string, IsFilterable: boolean, ColumnOrder: number }>();

  constructor(
    private actRoute: ActivatedRoute,
    private elem: ElementRef,
    private sellerservice: SellerService,
    private loginAuth: LoginauthService
  ) {}



  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.updateID = params['CategoryID'];
      if (this.updateID === undefined) {
        this.updateID = 'new';
        this.propertyData.ID = 'new';
      } else {
        this.sellerservice.getCategory(this.updateID).subscribe(res => {
          if (res['key'] === 'false') {
            this.categoryData = res;
          } else {
            this.categoryData = res;
            this.categoryID = res.CategoryID;
             this.sellerservice.getPropertiesforCategory(this.categoryData.CategoryID).subscribe(
              res1 => {
                console.log(res);
                this.propertiesData = res1['records'];
              }
             );
          }
        });
      }
    });
  }

  upload(event: any) {
    const files = this.elem.nativeElement.querySelector('#imageCategory').files;
    this.formData.append('image', files[0], files[0].name);
    if (!this.validateFile(files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    } else {
      this.fileToUpload = files.item(0);
    }
  }

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

  AddCategory(
    CategoryName: string,
    Description: string,
    Logo: string,
    LogoAlt: string
  ) {
    this.formData.append('CategoryID', this.updateID);
    this.formData.append('CategoryName', CategoryName);
    this.formData.append('CategoryDesc', Description);
    this.formData.append('ShopID', this.loginAuth.getSUserID());
    this.formData.append('CategoryImage', Logo);
    this.formData.append('CategoryImageAlt', LogoAlt);
    this.sellerservice.addCategory(this.formData).subscribe(res => {
      if (res['key'] === 'true') {
        this.categoryID = res['id'];
        document.getElementById('categoryFormDiv').style.display = 'none';
        console.log('Category Added Successfully');
      } else {
        console.log('Cannot add category');
      }
    });
  }

  addProperties(ID: string, PropertyName: string, PropertyDesc: string, Filterable: boolean, ColumnOrder: number) {
    if (this.categoryID !== 0) {
      if (ID === '') {
        ID = 'new';
      }
      // tslint:disable-next-line:max-line-length
      this.propertiesData.push({ ID: ID, PropertyName : PropertyName, PropertyDesc : PropertyDesc, IsFilterable: Filterable, ColumnOrder: ColumnOrder });
      this.propertyData.ID = 'new';
      this.propertyData.PropertyName = '';
      this.propertyData.PropertyDesc = '';
      this.propertyData.IsFilterable = false;
    } else {
      console.log('first Add category to add properties to it.');
    }
  }

  submitAllProperties() {
    console.log(this.propertiesData);
    this.sellerservice.addProperties(this.categoryID, this.propertiesData).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  EditProperty(Property: any, ID: string) {
    console.log('new' + this.propertyData.ID + this.propertyData);
    if (this.propertyData.ID !== 'new' && this.propertyData !== '') {
      // tslint:disable-next-line:max-line-length
      this.addProperties(this.propertyData.ID, this.propertyData.PropertyName, this.propertyData.PropertyDesc, this.propertyData.IsFilterable, this.propertyData.ColumnOrder);
    }
    const index = this.propertiesData.indexOf(Property);
    console.log('index: ' + index);
    const d = this.propertiesData.splice(index, 1);
    console.log('d: ' + d.length);
    this.propertyData = Property;
    console.log('this.propertyData: ' + this.propertyData.PropertyName);
  }
}
