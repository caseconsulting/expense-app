import { Component, OnInit } from '@angular/core';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ErrorService } from '../error/error.service';


@Component({
  selector: 'exp-expense-type-form',
  templateUrl: './expense-type-form.component.html',
  styleUrls: ['./expense-type-form.component.css']
})
export class ExpenseTypeFormComponent implements OnInit {
  id: any;
  model: ExpenseType;
  expenseType: ExpenseType;
  title = '';

  onSubmit(expenseType: ExpenseType) {
    let result;
    if (this.title === 'Create') {
      result = this.expenseTypeService.createExpenseType(expenseType);
    } else {
      result = this.expenseTypeService.updateExpenseType(expenseType);
    }

    result.subscribe(
      (res) => {
        this.router.navigate(['/expense-types', res.id]); // preview
        this.updateListService.announceUpdate('form'); // update the list
      },
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
    );
  }

  constructor(private location: Location,
    private expenseTypeService: ExpenseTypeService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    console.log(this.expenseType, '**');
    console.log(this.route.params)
    if (!this.expenseType) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => {
          if (id) {
            console.log(id);
            this.expenseTypeService.readSingleExpenseType(this.id)
              .subscribe(
              returnedExpenseType => {
                this.model = returnedExpenseType;
                this.title = 'Update';
              },
              error => this.errorService.announceError(error))
          } else {
            this.model = new ExpenseType('', '', 0, false);
            this.title = 'Create';
          }
        });
    }
  }

  goBack(): void {
     if (this.title === 'Update') {
       this.router.navigate(['/expense-types', this.model.id]); // preview
     } else {
       this.router.navigate(['//expense-types']); // list
     }
  }


  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
