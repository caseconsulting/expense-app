import {Component} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker.component.html'
})
export class NgbdDatepickerPopupComponent {
  model;

  onSubmit() {
    console.log(this.model);
   }
}
