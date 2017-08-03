import { Component } from '@angular/core';

@Component({
  selector: 'exp-header',

  template: `<h1 class="text-center"><span>{{specialE}}</span>{{title}}</h1>`,

  styles: [
    `h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    font-size: 48px;
    color: #38424D;
    padding-top: 1%;
    padding-bottom: 2%;
    }
    span {
      color: #68CAA6;
    }`]
})
export class HeaderComponent {
  specialE = '€';
  title = 'XPENSE APP';

}
