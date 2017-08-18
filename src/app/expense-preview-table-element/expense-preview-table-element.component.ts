import { Component, Input, OnChanges } from '@angular/core';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { ErrorService } from '../error/error.service';
import * as _ from 'lodash';
@Component({
  selector: 'exp-expense-preview-table-element',
  templateUrl: './expense-preview-table-element.component.html',
  styleUrls: ['./expense-preview-table-element.component.css']
})
export class ExpensePreviewTableElementComponent implements OnChanges {
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
    let expenseTypeArray = [{ type: '', total: 0, name: '' }];
    // TODO convert to lodash for each function
    for (let i = 0; i < this.criteriaArray.length; i++) {
      const tempObj = {
        type: this.criteriaArray[i].expenseTypeId,
        total: 0,
        name: ''
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
      _.forEach(this.criteriaArray, (expense) => {
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
        returnedExpenseType => {
          expenseType.name = returnedExpenseType.name;
          expenseType.budget = returnedExpenseType.budget;
        },
        error => this.errorService.announceError({ status: error, type: 'Expense Type' })
        );

    })

  }
}
