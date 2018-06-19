import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../loginauth.service';
import { SellerService } from '../services/seller.service';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  urls: any;
  shopInfo: any = '';
  flag: boolean;
  formData: FormData = new FormData();
  logoImage: string;

  constructor(
    private loginAuth: LoginauthService,
    private sellerservice: SellerService
  ) {}

  ngOnInit() {
    this.sellerservice
      .getSellerProfile(this.loginAuth.getSUserID())
      .subscribe(res => {
        this.shopInfo = res;
        this.logoImage = res.LogoImage;
        this.urls = environment.apiURL + 'Assets/ShopLogo/' + res.LogoImage;
      });
  }

  imagePreview(event: any) {
    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.urls = e.target.result;
      console.log(e.target.result + ' ' + this.urls);
    };
    if (!this.validateFile(files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    } else {
      this.formData.append('image', files[0], files[0].name);
    }
    reader.readAsDataURL(files[0]);
  }

  validateFile(name: String) {
    const ext: string = name.substring(name.lastIndexOf('.') + 1);
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

  form1Submit(
    ShopName: string,
    ShopType: string,
    Contact: string,
    Email: string,
    Address: string,
    City: string,
    State: string,
    Pincode: string
  ) {
    this.sellerservice
      .setSellerProfile(
        this.loginAuth.getSUserID(),
        ShopName,
        ShopType,
        Contact,
        Email,
        Address,
        City,
        State,
        Pincode
      )
      .subscribe(res => {
        if (res['key'] === 'true') {
          console.log('Profile updated successfully.');
        } else {
          console.log('Cannot update seller profile');
        }
      });
  }

  form2Submit(GSTNo: string, LogoAlt: string, TagLine: string) {
    this.formData.append('GSTNo', GSTNo);
    this.formData.append('LogoAlt', LogoAlt);
    this.formData.append('TagLine', TagLine);
    this.formData.append('ShopID', this.loginAuth.getSUserID());
    this.formData.append('LogoImage', this.logoImage);
    this.sellerservice.setSellerProfile2(this.formData).subscribe(res => {
      if (res['key'] === 'true') {
        console.log('Success');
      } else {
        console.log('Failed');
      }
    });
  }

  form3Submit(FL: string, TL: string, IL: string, YL: string) {
    this.sellerservice
      .setSellerProfile3(this.loginAuth.getSUserID(), FL, TL, IL, YL)
      .subscribe(res => {
        if (res['key'] === 'true') {
          console.log('Updated');
        } else {
          console.log('Not Updated');
        }
      });
  }

  Form1() {
    document.getElementById('form1').style.display = 'block';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'none';
  }
  Form2() {
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementById('form3').style.display = 'none';
  }
  Form3() {
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'block';
  }

  myForm3() {
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'block';
  }

  myPrev3() {
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementById('form3').style.display = 'none';
  }

  myPrev2() {
    document.getElementById('form1').style.display = 'block';
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'none';
  }
}
