import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {

  flag: boolean;

  myForm2() {
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';
    document.getElementById('form3').style.display = 'none';
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



  upload(event: any) {
    let files: any = event.target.files;

    if (!this.validateFile(files[0].name)) {
        console.log('Selected file format is not supported');

        return false;
    }
  }

  validateFile(name: String) {
    const ext: string = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg') {
      this.flag = false;
        return true;
    } else {
      this.flag = true;
        return false;
    }
}

  constructor() { }

  ngOnInit() {
  }

}
