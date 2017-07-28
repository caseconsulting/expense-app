import { Component } from '@angular/core';

@Component({
  selector: 'exp-header',
<<<<<<< HEAD
  template: `<h1 class="text-center"><span>{{specialE}}</span>{{title}}</h1> <exp-create-btn></exp-create-btn> `,
=======
  template: `<h1><span>{{specialE}}</span>{{title}}</h1>`,
>>>>>>> testing-services: began routing tests
  styles: [
    `h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    color: #38424D;
    }
    span {
      color: #009688;
    }`]
})
export class HeaderComponent {
  specialE = '€';
  title = 'XPENSE APP';

}
