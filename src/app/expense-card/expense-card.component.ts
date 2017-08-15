import { Component, Input, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
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
  expenseType: ExpenseType;
  employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private updateListService: UpdateListService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit() {
    if (this.model.reimbursedDate === 'not assigned') {
      this.reimburseFlag = false;
    } else {
      this.reimburseFlag = true;
    }
    this.getExpenseType();
    this.getEmployee();
  }
  updateDate(val: any) {
    let update;
    if (this.reimburseFlag === true) {
      const today = new Date();
      this.model.reimbursedDate = today.toISOString().substring(0, 10);
      update = this.expenseService.updateExpense(this.model);

    } else {
      this.model.reimbursedDate = 'not assigned';
      update = this.expenseService.updateExpense(this.model);

    }
    update.subscribe(
      res => { },
      error => this.errorService.announceError({ status: error, type: 'Employees' })
    );
  }

  getExpenseType() {
    this.expenseTypeService.readSingleExpenseType(this.model.expenseTypeId)
      .subscribe(
      returnedExpenseType => this.expenseType = returnedExpenseType,
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }
  getEmployee() {
    this.employeeService.readSingleEmployee(this.model.userId)
      .subscribe(
      returnedEmployee => this.employee = returnedEmployee,
      error => this.errorService.announceError({ status: error, type: 'Employee' })
      );
  }
}
