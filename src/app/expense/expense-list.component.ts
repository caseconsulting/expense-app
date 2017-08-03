import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Expense, ExpenseService} from './expense.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-expense',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  selectedExpense: Expense;
  expenses: Expense[];
  subscription: Subscription;

  constructor(private expenseTypeService: ExpenseService,
    private updateListService: UpdateListService,
    private router: Router,
    private errorService: ErrorService) {

    this.subscription = updateListService.updateAnnounced$.subscribe(
      caller => this.updateList(caller)
    )
  }

  getExpenses() {
    this.expenseTypeService.getExpenses()
      .subscribe(
      expenses => this.expenses = expenses,
      error => this.errorService.announceError({ status: error, type: 'Expense' })
      );
  }

  ngOnInit() { this.getExpenses(); }

  updateList(caller: string) {
    this.getExpenses();
    if (caller === 'remove') {
      this.router.navigate(['/expenses']);
    }
  }

}
