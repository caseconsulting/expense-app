import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { UpdateListService } from '../update-list.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-expense-type-preview',
  templateUrl: './expense-type-preview.component.html',
  styleUrls: ['./expense-type-preview.component.css']
})
export class ExpenseTypePreviewComponent implements OnInit {

  private id: any;
  expenseType: ExpenseType;
  model: ExpenseType;
  constructor(private expenseTypeService: ExpenseTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    if (!this.expenseType) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => this.expenseTypeService.readSingleExpenseType(this.id)
          .subscribe(
          returnedExpenseType =>
            this.model = returnedExpenseType,
          error => this.errorService.announceError({ status: error, type: 'ExpenseType' })
          ));
    }
  }

}
