import { Component, Input, OnChanges } from '@angular/core';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { Expense } from '../expense/expense.service';
import { ErrorService } from '../error/error.service';
import * as _ from 'lodash';
@Component({
  selector: 'exp-expense-totals',
  templateUrl: './expense-totals.component.html',
  styleUrls: ['./expense-totals.component.css']
})
export class ExpenseTotalsComponent implements OnChanges {
  @Input() criteriaArray: any;
  expenseTypes: any[];

  constructor(private expenseTypeService: ExpenseTypeService,
    private errorService: ErrorService) { }

  ngOnChanges() {
    this.expenseTypes = this.findBudgets();
    this.calculatePerBudget();
    this.getExpenseTypeName();

  }

  findBudgets() {
    let expenseTypeArray = [{ type: '', total: 0, budgetName: '' }];
    // TODO convert to lodash for each function
    for (let i = 0; i < this.criteriaArray.length; i++) {
      const tempObj = {
        type: this.criteriaArray[i].expenseTypeId,
        total: 0,
        budgetName: ''
      };
      expenseTypeArray.push(tempObj);
    }
    expenseTypeArray = _.drop(expenseTypeArray);
    expenseTypeArray = _.uniqBy(expenseTypeArray, 'type');
    return expenseTypeArray;
  }

  calculatePerBudget() {
    // O(n^2) lol
    _.forEach(this.expenseTypes, (expenseType) => {
      _.forEach(this.criteriaArray, (expense: Expense) => {
        if (expense.expenseTypeId === expenseType.type) {
          expenseType.total += expense.cost;
        }
      });
    });
  }

  getExpenseTypeName() {
    _.forEach(this.expenseTypes, (expenseType) => {
      this.expenseTypeService.readSingleExpenseType(expenseType.type)
        .subscribe(
        returnedExpenseType => expenseType.budgetName = returnedExpenseType.budgetName,
        error => this.errorService.announceError({ status: error, type: 'Expense Type' })
        );

    })

  }





}
