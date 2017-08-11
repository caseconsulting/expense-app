import {Component, Output, EventEmitter} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker.component.html'
})
export class NgbdDatepickerPopupComponent {
  @Output() onSelection = new EventEmitter<any>();
  model;
  onSubmit();

  onSubmit() {
    console.log(this.model);
    this.onSelection.emit(this.model);
   }
}
