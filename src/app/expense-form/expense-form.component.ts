import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { EmployeeService, Employee } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ErrorService } from '../error/error.service';
import * as moment from 'moment';
import { NgbDateParserFormatter, NgbDateStruct, NgbDatepicker, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'exp-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  providers: [NgbTypeaheadConfig]
})

export class ExpenseFormComponent implements OnInit {
  id: any;
  model: Expense;
  employee: Employee;
  expense: Expense;
  expenseTypes: ExpenseType[];
  selectedExpenseType: ExpenseType;
  title = '';
  employees: Employee[];

  constructor(private location: Location,
    private expenseService: ExpenseService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private expenseTypeService: ExpenseTypeService,
    private parser: NgbDateParserFormatter,
    config: NgbTypeaheadConfig,
    private employeeService: EmployeeService) { config.showHint = true; }

  ngOnInit() {
    if (!this.expense) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => {
          if (id) {
            this.retrieveExpenseData(this.id);
          } else {
            // create new expense
            this.model = new Expense('', '', '', 0, '', '', '', '', '', '');
            this.title = 'Create';
          }
        },
        error => this.errorService.announceError({ status: error, type: 'Expense' }));
    }
    this.getExpenseTypes();
    this.employeeService.getEmployees()
      .subscribe(
      listOfEmployees => this.employees = listOfEmployees,
      error => this.errorService.announceError({ status: error, type: 'Employee' })
      );
  }

  retrieveExpenseData(id: string) {
    this.expenseService.readSingleExpense(this.id)
      .subscribe(
      returnedExpense => {
        this.title = 'Update';
        this.model = returnedExpense;
        this.model.purchaseDate = this.dateStringToObject(this.model.purchaseDate);
        this.model.reimbursedDate = this.dateStringToObject(this.model.reimbursedDate);
        this.employeeService.readSingleEmployee(this.model.userId)
          .subscribe(
          returnedEmployee => this.employee = returnedEmployee,
          error => this.errorService.announceError({ status: error, type: 'Employee' })
          );
      },
      error => this.errorService.announceError({ status: error, type: 'Expense' }));
  }

  onSubmit(expense: Expense) {
    const today = new Date();
    this.model.createdAt = today.toISOString().substring(0, 10);
    let result;
    this.model.receipt = 'N/A';
    this.model.userId = this.employee.id;
    this.model.expenseTypeId = this.selectedExpenseType.id;
    this.model.purchaseDate = this.dateToString(this.model.purchaseDate);
    if (this.model.reimbursedDate) {
      this.model.reimbursedDate = this.dateToString(this.model.reimbursedDate);
    } else {
      this.model.reimbursedDate = 'not assigned';
    }
    console.log(this.selectedExpenseType)

    if (this.title === 'Create') {
      result = this.expenseService.createExpense(this.model);
    } else {
      result = this.expenseService.updateExpense(this.model);
    }

    result.subscribe(
      (res) => {
        this.router.navigate(['/expenses', res.id]); // preview
        this.updateListService.announceUpdate('form'); // update the list
      },
      error => this.errorService.announceError({ status: error, type: 'Expense' })
    );
  }

  dateToString(date) {
    const dateString = new Date(`${date.month}/${date.day}/${date.year}`);
    console.log('date string', dateString)
    const momentDate: moment.Moment = moment(dateString);
    console.log(momentDate);
    return momentDate.format('YYYY-MM-DD');
  }

  datePreviewSetup(focusedCal, otherCal) {
    focusedCal.open();
    otherCal.close();
  }

  dateStringToObject(date: string) {
    return this.parser.parse(date);
  }

  getExpenseTypes() {
    this.expenseTypeService.getExpenseTypes()
      .subscribe(
      returnedExpenseTypes => this.expenseTypes = returnedExpenseTypes,
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }
  goBack(): void {
    if (this.title === 'Update') {
      this.router.navigate(['/expenses', this.model.id]); // preview
    } else {
      this.router.navigate(['/expenses']); // list
    }
  }

  searchEmployee = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.employees.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterEmployee = (x: { firstName: string, lastName: string }) => `${x.firstName} ${x.lastName}`;

  searchExpenseType = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.expenseTypes.filter(v => v.budgetName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterExpenseType = (x: { budgetName: string }) => `${x.budgetName}`;

}
