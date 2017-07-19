import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
  changed(changedEmployee: any) {
    if (changedEmployee) {
      console.warn('something changed', changedEmployee);
    }
  }
}
