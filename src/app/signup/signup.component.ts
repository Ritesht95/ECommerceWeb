import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private sellerservice: SellerService) { }

  ngOnInit() {
  }

  signUp(SName: string, SType: string, PhoneNo: string, Email: string, OName: string) {
    this.sellerservice.setSignUp(SName, SType, PhoneNo, Email, OName).subscribe(
      res => {
        if (res['key'] === 'true') {
          console.log('Request Added');
        } else {
          console.log('Server Error!');
        }
      }
    );
  }

}
