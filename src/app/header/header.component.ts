import { Component } from '@angular/core';

@Component({
  selector: 'exp-header',

  template: `<h1 class="text-center"><span>{{specialE}}</span>{{title}}</h1>`,

  styles: [
    `h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    color: #38424D;
    }
    span {
      color: #68CAA6;
    }`]
})
export class HeaderComponent {
  specialE = '€';
  title = 'XPENSE APP';

}
