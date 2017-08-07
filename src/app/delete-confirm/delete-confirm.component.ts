import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Employee, EmployeeService } from '../employee/employee.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService } from '../error/error.service';
@Component({
  selector: 'exp-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
  @Input() modelToDelete: any;
  closeResult: string;
  constructor(private modalService: NgbModal,
    private employeeService: EmployeeService,
    private expenseTypeService: ExpenseTypeService,
    private expenseService: ExpenseService,
    private updateListService: UpdateListService,
    private errorService: ErrorService) { }

confirmDeleteEmployee() {
  this.employeeService.deleteEmployee(this.modelToDelete)
    .subscribe(
    () => { this.updateListService.announceUpdate('remove') },
    error => this.errorService.announceError({ status: error, type: 'Employee' })
    );
}

confirmDeleteExpenseType() {
  this.expenseTypeService.deleteExpenseType(this.modelToDelete)
    .subscribe(
    () => { this.updateListService.announceUpdate('remove') },
    error => this.errorService.announceError({ status: error, type: 'Expense Type' })
    );
}

confirmDeleteExpense() {
  this.expenseService.deleteExpense(this.modelToDelete)
    .subscribe(
    () => { this.updateListService.announceUpdate('remove') },
    error => this.errorService.announceError({ status: error, type: 'Expense' })
    );
}

  open(content) {
    // lol...
    if (this.modelToDelete.empId) {
    this.modalService.open(content).result.then(this.confirmDeleteEmployee.bind(this))
    .catch(dismissReason => console.log(dismissReason));
    } else if (this.modelToDelete.budget) {
      this.modalService.open(content).result.then(this.confirmDeleteExpenseType.bind(this))
      .catch(dismissReason => console.log(dismissReason));
    } else if (this.modelToDelete.cost) {
      this.modalService.open(content).result.then(this.confirmDeleteExpense.bind(this))
      .catch(dismissReason => console.log(dismissReason));
    }


  }
}
