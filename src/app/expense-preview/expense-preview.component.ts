import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { UpdateListService } from '../update-list.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-expense-preview',
  templateUrl: './expense-preview.component.html',
  styleUrls: ['./expense-preview.component.css']
})
export class ExpensePreviewComponent implements OnInit {

  private id: any;
  expense: Expense;
  model: Expense;
  constructor(private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    if (!this.expense) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => this.expenseService.readSingleExpense(this.id)
          .subscribe(
          returnedExpense =>
            this.model = returnedExpense,
          error => this.errorService.announceError({ status: error, type: 'Expense' })
          ));
    }
  }

}
