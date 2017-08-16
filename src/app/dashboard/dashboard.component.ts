import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

// These constants are used for checking the date range in the ng-bootstrap calendar
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'exp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[];
  expensesInRange: any[];
  employee: Employee;
  employees: Employee[];
  expenseType: ExpenseType;
  expenseTypes: ExpenseType[];
  // ng-bootstrap calendar
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(
    private employeeService: EmployeeService,
    private expenseService: ExpenseService,
    private expenseTypeService: ExpenseTypeService,
    private updateListService: UpdateListService,
    private router: Router,
    private errorService: ErrorService,
    private formatter: NgbDateParserFormatter,
    calendar: NgbCalendar
  ) {
    // ng-bootstrap calendar
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.getAllInformation();

  }



  // ng-bootstrap calendar function for handling date changes
  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.getExpensesWithinRange();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  // ng-bootstrap calendar booleans
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => this.fromDate && after(date, this.fromDate) && before(date, this.toDate) && this.toDate;
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  /** Convert expense purchase date into NgbDateStruct
  * compare expense date to selected dates
  * if expenseDate isInside dateRange
  * store in expensesInRange[]
  */
  getExpensesWithinRange() {

    const dateFilter = _.filter(this.expenses, obj =>
      ((this.isFrom(this.formatter.parse(obj.purchaseDate))
        || this.isTo(this.formatter.parse(obj.purchaseDate))
        || this.isInside(this.formatter.parse(obj.purchaseDate)))));
    this.expensesInRange = _.intersection(dateFilter, this.expensesInRange);
    console.log('***', this.expensesInRange);
  }

  getEmployeeRange() {
    if (this.employee.id) {
      const tempArr = this.expenses;
      const employeesExpenses = _.filter(tempArr, obj => obj.userId === this.employee.id);
      this.expensesInRange = _.intersection(employeesExpenses, this.expensesInRange);
      console.log('***', this.expensesInRange);
    }
  }

  getExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
      expenses => {
        this.expenses = expenses;
        this.expensesInRange = expenses;
        console.log(this.expensesInRange)
      },
      error => this.errorService.announceError({ status: error, type: 'Expense' })
      );
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(
      returnedEmployees => this.employees = returnedEmployees,
      error => this.errorService.announceError({ status: error, type: 'Employee' })
      );
  }

  getExpenseType() {
    this.expenseTypeService.getExpenseTypes()
      .subscribe(
      returnedExpenseType => this.expenseType = returnedExpenseType,
      error => this.errorService.announceError({ status: error, type: 'Expense Type' })
      );
  }

  getAllInformation() {
    this.getExpenses();
    this.getEmployees();
    this.getExpenseType();
  }

  searchEmployee = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.employees.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  formatterEmployee = (x: { firstName: string, lastName: string }) => `${x.firstName} ${x.lastName}`;



}
