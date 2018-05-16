import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-info',
  templateUrl: './web-info.component.html',
  styleUrls: ['./web-info.component.css']
})
export class WebInfoComponent implements OnInit {

  flag: boolean;
  constructor() { }

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

  ngOnInit() {
  }

}
