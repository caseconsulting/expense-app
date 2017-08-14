import { Component, Input, OnInit } from '@angular/core';
import { Employee, EmployeeService} from '../employee/employee.service';
import { Expense, ExpenseService} from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService} from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
@Component({
  selector: 'exp-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent implements OnInit {
  @Input() model: Expense;
  reimburseFlag: boolean;
  constructor(
  private employeeService: EmployeeService,
  private expenseService: ExpenseService,
  private updateListService: UpdateListService,
  private router: Router,
  private errorService: ErrorService) { }

ngOnInit() {
  if (this.model.reimbursedDate === 'not assigned') {
    this.reimburseFlag = false;
  } else {
    this.reimburseFlag = true;
}
}
  updateDate(val: any) {
    const today = new Date();
    console.log('val: ', val, 'reimburseFlag', this.reimburseFlag);
    console.log('today', today )
    this.model.reimbursedDate = today;
    this.expenseService.updateExpense(this.model)
    .subscribe(
      res => {},
      error => this.errorService.announceError({ status: error, type: 'Employees' })
    )
  }
}
