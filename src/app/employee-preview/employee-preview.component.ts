import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as _ from 'lodash';

import { UpdateListService } from '../update-list.service';
import { Employee, EmployeeService } from '../employee/employee.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-employee-preview',
  templateUrl: './employee-preview.component.html',
  styleUrls: ['./employee-preview.component.css']
})
export class EmployeePreviewComponent implements OnInit {

  private id: any;
  employee: Employee;
  model: Employee;
  expenses: Expense[];
  expenseTypes: ExpenseType[];
  expenseTypeList: any[];
  expenseTypeName: string;
  constructor(private employeeService: EmployeeService,
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    if (!this.employee) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => this.employeeService.readSingleEmployee(this.id)
          .subscribe(
          returnedEmployee => {
            this.model = returnedEmployee
            this.getExpenses();
            this.getExpenseTypes();
          },
          error => this.errorService.announceError({ status: error, type: 'Employee' })
          ));
    }
    this.expenseTypeList = this.findBudgets();
    this.calculatePerBudget();
  }

  getExpenseTypes() {
    this.expenseTypeService.getExpenseTypes()
      .subscribe(
      returnedExpenseTypes => {
        this.expenseTypes = returnedExpenseTypes;
      },
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }

  getExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
      expenses => {
        this.expenses = expenses;
        this.filterExpenses();
      },
      error => this.errorService.announceError({ status: error, type: 'Expense' })
      );
  }

  findBudgets() {
    let expenseTypeArray = [{ type: '', total: 0, name: '' }];
    // TODO convert to lodash for each function
    if (this.expenses) {

      for (let i = 0; i < this.expenses.length; i++) {
        const tempObj = {
          type: this.expenses[i].expenseTypeId,
          total: 0,
          name: ''
        };
        expenseTypeArray.push(tempObj);
      }
    }
    expenseTypeArray = _.drop(expenseTypeArray);
    expenseTypeArray = _.uniqBy(expenseTypeArray, 'type');
    return expenseTypeArray;
  }

  calculatePerBudget() {
    // O(n^2) lol
    _.forEach(this.expenseTypeList, (expenseType) => {
      _.forEach(this.expenses, (expense) => {
        if (expense.expenseTypeId === expenseType.type) {
          expenseType.total += expense.cost;
        }
      });
    });
  }

  filterExpenses() {
    this.expenses = _.filter(this.expenses, expense => expense.userId === this.model.id);
  }
}
