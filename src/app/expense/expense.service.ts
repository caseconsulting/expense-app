import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const expenseRoute = 'http://localhost:3000/expenses/';

export class Expense {

  constructor(
    public id: string,
    public purchaseDate: any,
    public reimbursedDate: any,
    public cost: number,
    public description: string,
    public note: string,
    public receipt: string,
    public expenseTypeId: string,
    public userId: string
  ) { }
}

@Injectable()
export class ExpenseService {
  constructor(private http: Http) { }

  getExpenses() {
    return this.http
      .get(expenseRoute)
      .map((response: Response) => <Expense[]>response.json())
      .catch(this.handleError);
  }

  createExpense(expense: Expense) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(expenseRoute, JSON.stringify(expense), options)
      .map((response: Response) => <Expense>response.json())
      .do(data => console.log('sending ', data.id))
      .catch(this.handleError);
  }

  readSingleExpense(id: string) {
    return this.http
      .get(expenseRoute + id)
      .map((response: Response) => <Expense>response.json())
      .catch(this.handleError);

  }

  updateExpense(expense: Expense) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put(expenseRoute + expense.id, JSON.stringify(expense), options)
      .map((res: Response) => <Expense>res.json())
      .catch(this.handleError);
  }

  deleteExpense(expense: Expense) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .delete(expenseRoute + expense.id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error.status);
  }


}
