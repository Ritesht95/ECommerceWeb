import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  flag: boolean;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  webInfo: any;


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


  ngOnInit() {
  }

}