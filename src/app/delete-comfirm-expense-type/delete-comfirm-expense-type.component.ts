import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService } from '../error/error.service';
@Component({
  selector: 'exp-delete-comfirm-expense-type',
  templateUrl: './delete-comfirm-expense-type.component.html',
  styleUrls: ['./delete-comfirm-expense-type.component.css']
})
export class DeleteComfirmExpenseTypeComponent {
  @Input() modelToDelte: ExpenseType;
  closeResult: string;
  constructor(private modalService: NgbModal,
    private expenseTypeService: ExpenseTypeService,
    private updateListService: UpdateListService,
    private errorService: ErrorService) { }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // call delete here inside the promise. When the promise resolves, delete has been
      // clicked and these instructions will execute

      this.expenseTypeService.deleteExpenseType(this.modelToDelte)
        .subscribe(
        () => { this.updateListService.announceUpdate('remove') },
        error => this.errorService.announceError({ status: error, type: 'Expense Type' })
        );
    });
  }

}
