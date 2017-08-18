import { Component, OnInit, Input } from '@angular/core';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-expense-preview-table-element',
  templateUrl: './expense-preview-table-element.component.html',
  styleUrls: ['./expense-preview-table-element.component.css']
})
export class ExpensePreviewTableElementComponent implements OnInit {
  @Input() row;
  expenseTypeName: string;
  constructor(
    private expenseTypeService: ExpenseTypeService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.getExpenseTypeName();
  }

  getExpenseTypeName() {
    this.expenseTypeService.readSingleExpenseType(this.row.expenseTypeId)
      .subscribe(
      returnedExpenseType => this.expenseTypeName = returnedExpenseType.name,
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }

}
