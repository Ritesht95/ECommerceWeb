import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  flag: boolean;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  webInfo: any;

  imgURL: String = '../../assets/img/avatar.png';
  FileToUpload: File = null;
  urls = new Array<string>();


  constructor( private elem: ElementRef ) { }

  upload(event: any) {
    const files = this.elem.nativeElement.querySelector('#imageWebInfo').files;
    this.formData.append('image', files[0], files[0].name);
    this.formData.append('Id', '1');
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

  imagePreview(file: FileList) {
    /*const files = this.elem.nativeElement.querySelector('#image').files;
    let i = 0;
    const url: any;
    const n = files.length;
    for ( i = 0; i < n ; i++) {
      console.log(files[i]) ;
      console.log(files[i].name) ;
      console.log('path: ' + files[i].eventtarget );
      this.url = event.target.result;
      console.log(event.eventtarget);
      // tslint:disable-next-line:max-line-length
      document.getElementById('gallery').innerHTML += '<img src="~/' + files[i].target.eventtarget + '" width="450" height="300"/>'; // attr('src', files[0].target.result) ;
    }
    if (files) {
      console.log('file seleted');
    } */

    var reader = new FileReader();
    this.urls = [];
    let files = event.target.files;
    if ( files.length <= 4 ) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        if (!this.validateFile(files[0].name)) {
          console.log('Selected file format is not supported');
          return false;
        } else {
          this.fileToUpload = files.item(0);
        }
        reader.readAsDataURL(file);
      }
    }
  }



  ngOnInit() {
  }

}
