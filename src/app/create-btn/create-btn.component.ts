import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'exp-create-btn',
  templateUrl: './create-btn.component.html',
  styleUrls: ['./create-btn.component.css']
})
export class CreateBtnComponent {
clicked = false;
  constructor() { }

  hideView(removeView: boolean) {
    this.clicked = false;
    console.log('changing value of clicked in create-btn to ', this.clicked);
  }

}
