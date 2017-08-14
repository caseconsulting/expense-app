import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService} from '../employee/employee.service';
import { Expense, ExpenseService} from '../expense/expense.service';
import { ExpenseType, ExpenseTypeService} from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';
@Component({
  selector: 'exp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
expenses: Expense[];
userInputDate: any;

  constructor(
    private employeeService: EmployeeService,
    private expenseService: ExpenseService,
    private updateListService: UpdateListService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
      expenses => this.expenses = expenses,
      error => this.errorService.announceError({ status: error, type: 'Expense' })
      );
  }



}
