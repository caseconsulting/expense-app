import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { Expense, ExpenseService } from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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

  // ng-bootstrap calendar
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(
    private employeeService: EmployeeService,
    private expenseService: ExpenseService,
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
    this.getExpenses();
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
    let expenseDateStruct: NgbDateStruct;
    const tempArr = [{}];

    for (let i = 0; i < this.expenses.length; i++) {
      expenseDateStruct = this.formatter.parse(this.expenses[i].purchaseDate);
      if (this.isFrom(expenseDateStruct)
        || this.isTo(expenseDateStruct)
        || this.isInside(expenseDateStruct)) {
        tempArr.push(this.expenses[i]);
      }
    }
    this.expensesInRange = tempArr.splice(1, tempArr.length - 1);
    console.log(this.expensesInRange);
  }

  getExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
      expenses => this.expenses = expenses,
      error => this.errorService.announceError({ status: error, type: 'Expense' })
      );
  }



}
