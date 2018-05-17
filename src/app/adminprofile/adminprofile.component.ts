import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  hideTable() {
    const x = document.getElementById('tableDetail');
    const y = document.getElementById('tableDetail2');
    const btn1 = document.getElementById('btnSave');
    const btn2 = document.getElementById('btnCancel');
    const btn3 = document.getElementById('btnEC');
    if ( x.style.display === 'none' )   {
        x.style.display = 'table';
        y.style.display = 'none';
        btn1.style.display = 'none';
        btn2.style.display = 'none';
        btn3.style.display = 'block';
    } else {
      x.style.display = 'none';
      y.style.display = 'table';
      btn1.style.display = 'inline';
      btn2.style.display = 'inline';
      btn3.style.display = 'none';
    }

  }

  hideButton() {
      document.getElementById('btnEC').style.display = 'block' ;
      document.getElementById('btnSave').style.display = 'none' ;
      document.getElementById('btnCancel').style.display = 'none' ;
      document.getElementById('tableDetail2').style.display = 'none' ;
      document.getElementById('tableDetail').style.display = 'table' ;
  }



  constructor() { }

  ngOnInit() {
  }

}
