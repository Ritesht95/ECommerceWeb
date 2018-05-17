import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-web-info',
  templateUrl: './web-info.component.html',
  styleUrls: ['./web-info.component.css']
})
export class WebInfoComponent implements OnInit {
  flag: boolean;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  constructor(private superadminservice: SuperAdminService, private elem: ElementRef) {}

  upload(event: any) {
    const files = this.elem.nativeElement.querySelector('#image').files;
    // const files: any = event.target.files;

    this.formData.append('image', files[0], files[0].name);

    if (!this.validateFile(files[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    } else {
      this.fileToUpload = files.item(0);
    }
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

  AddWebInfoDetails() {
    this.superadminservice.postFile(this.formData).subscribe(res => {
      console.log(res);
    });
    // console.log(formValues);
  }

  ngOnInit() {}
}
