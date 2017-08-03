import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Expense, ExpenseService } from '../expense/expense.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-delete-confirm-expense',
  templateUrl: './delete-confirm-expense.component.html',
  styleUrls: ['./delete-confirm-expense.component.css']
})
export class DeleteConfirmExpenseComponent {

  @Input() modelToDelte: Expense;
  closeResult: string;
  constructor(private modalService: NgbModal,
    private expenseService: ExpenseService,
    private updateListService: UpdateListService,
    private errorService: ErrorService) { }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // call delete here inside the promise. When the promise resolves, delete has been
      // clicked and these instructions will execute

      this.expenseService.deleteExpense(this.modelToDelte)
        .subscribe(
        () => { this.updateListService.announceUpdate('remove') },
        error => this.errorService.announceError({ status: error, type: 'Expense' })
        );
    });
  }


}
