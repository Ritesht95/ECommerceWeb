import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {

  constructor() {
    document.getElementsByTagName('body')[0].classList.remove('skin-blue');
    document.getElementsByTagName('body')[0].classList.remove('sidebar-mini');
    document.getElementsByTagName('body')[0].classList.remove('fixed');
    document.getElementsByTagName('body')[0].classList.add('lockscreen');
    document.getElementsByTagName('body')[0].classList.add('hold-transition');
    document.getElementsByTagName('body')[0].setAttribute('background-color', '#808080');
  }

  ngOnInit() {
  }

}
