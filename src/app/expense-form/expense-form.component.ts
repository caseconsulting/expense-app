import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ErrorService } from '../error/error.service';


@Component({
  selector: 'exp-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  id: any;
  model: Expense;
  expense: Expense;
  expenseTypes: ExpenseType;
  selectedExpenseType: string;
  title = '';

  onSubmit(expense: Expense) {
    expense.receipt = 'N/A';
    console.log(expense);
    let result;
    if (this.title === 'Create') {
      result = this.expenseService.createExpense(expense);
    } else {
      result = this.expenseService.updateExpense(expense);
    }

    result.subscribe(
      (res) => {
        this.router.navigate(['/expenses', res.id]); // preview
        this.updateListService.announceUpdate('form'); // update the list
      },
      error => this.errorService.announceError({ status: error, type: 'Expense' })
    );
  }

  constructor(private location: Location,
    private expenseService: ExpenseService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private expenseTypeService: ExpenseTypeService) { }

  ngOnInit() {
    console.log(this.route.params)
    if (!this.expense) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => {
          if (id) {
            console.log(id);
            this.expenseService.readSingleExpense(this.id)
              .subscribe(
              returnedExpense => {
                this.model = returnedExpense;
                this.title = 'Update';
                console.log(this.model, '***');
              },
              error => this.errorService.announceError(error))
          } else {
            this.model = new Expense('', '', '', 0, '', '', '', '', '');
            this.title = 'Create';
          }
        });
    }
    this.getExpenseTypes();
  }
  getExpenseTypes() {
    this.expenseTypeService.getExpenseTypes()
      .subscribe(
      returnedExpenseTypes => this.expenseTypes = returnedExpenseTypes,
      error => this.errorService.announceError(error)
      );
  }
  goBack(): void {
    if (this.title === 'Update') {
      this.router.navigate(['/expenses', this.model.id]); // preview
    } else {
      this.router.navigate(['/expenses']); // list
    }
  }
  setExpenseType() {
    this.model.expenseTypeId = this.selectedExpenseType;
    console.log(this.selectedExpenseType);
  }


  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
