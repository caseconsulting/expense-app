import {Component, Output, EventEmitter} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Employee } from '../employee/employee.service';

@Component({
  selector: 'exp-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
  @Output() delete = new EventEmitter<boolean>();
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // call delete here inside the promise. When the promise resolves, delete has been
      // clicked and these instructions will execute
      this.delete.emit(true);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

// diagnostic
  private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'delete') {
      return 'by clicking delete';
    } else {
      return  `with: ${reason}`;
    }
   }
}
