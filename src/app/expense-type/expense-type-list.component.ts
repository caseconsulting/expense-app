import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpenseType, ExpenseTypeService} from './expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-expenseType-list',
  templateUrl: './expense-type-list.component.html',
  styleUrls: ['expense-type-list.component.css'],
  providers: [ExpenseTypeService, UpdateListService]
})

export class ExpenseTypeListComponent implements OnInit {
  // TODO If this is removed remove Output from the imports as well
  // @Output() changed = new EventEmitter<ExpenseType>();

  selectedExpenseType: ExpenseType;
  expenseTypes: ExpenseType[];
  subscription: Subscription;

  constructor(private expenseTypeService: ExpenseTypeService,
    private updateListService: UpdateListService,
    private router: Router,
    private errorService: ErrorService) {

    this.subscription = updateListService.updateAnnounced$.subscribe(
      caller => this.updateList(caller)
    )
  }

  getExpenseTypes() {
    this.expenseTypeService.getExpenseTypes()
      .subscribe(
      expenseTypes => this.expenseTypes = expenseTypes,
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }

  ngOnInit() { this.getExpenseTypes(); }

  // select(selectedExpenseType: ExpenseType) {
  //   console.log('before ', this.selectedExpenseType);
  //   this.selectedExpenseType = selectedExpenseType;
  //   // this.changed.emit(selectedExpenseType);
  //   console.log('after ', this.selectedExpenseType);
  // }

  updateList(caller: string) {
    this.getExpenseTypes();
    if (caller === 'remove') {
      this.router.navigate(['/expense-types']);
    }
  }
}
