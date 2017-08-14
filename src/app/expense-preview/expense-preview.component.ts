import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { UpdateListService } from '../update-list.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ErrorService } from '../error/error.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { Employee, EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'exp-expense-preview',
  templateUrl: './expense-preview.component.html',
  styleUrls: ['./expense-preview.component.css']
})
export class ExpensePreviewComponent implements OnInit {

  private id: any;
  employeeName: string;
  expenseTypeName: string;
  expense: Expense;
  model: Expense;
  constructor(private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private employeeService: EmployeeService,
    private expenseTypeService: ExpenseTypeService) { }

  ngOnInit() {
    if (!this.expense) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => this.expenseService.readSingleExpense(this.id)
          .subscribe(
          returnedExpense => {
            this.model = returnedExpense;
            this.getExpenseTypeName();
            this.getEmployeeName();
          },
          error => this.errorService.announceError({ status: error, type: 'Expense' })
          ));

    }
  }
  getExpenseTypeName() {
    this.expenseTypeService.readSingleExpenseType(this.model.expenseTypeId)
      .subscribe(
      returnedExpenseType => this.expenseTypeName = returnedExpenseType.name,
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }
  getEmployeeName() {
    this.employeeService.readSingleEmployee(this.model.userId)
      .subscribe(
      returnedEmployee => this.employeeName = `${returnedEmployee.firstName} ${returnedEmployee.middleName} ${returnedEmployee.lastName}`,
      error => this.errorService.announceError({ status: error, type: 'Employee' })
      );
  }
}
