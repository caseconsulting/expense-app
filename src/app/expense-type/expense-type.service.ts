import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const expenseTypeRoute = 'http://localhost:3000/expense-types/';

/**
*@param id
*@param firstName
*@param middleName
*@param lastName
*@param empId
*@param hireDate
*/

export class ExpenseType {
  constructor(
    public id: string,
    public name: string,
    public budget: number,
    public overdraftFlag: boolean,
  ) { }
}

@Injectable()
export class ExpenseTypeService {

  constructor(private http: Http) { }

  getExpenseTypes() {
    return this.http
      .get(expenseTypeRoute)
      .map((response: Response) => <ExpenseType[]>response.json())
      .catch(this.handleError);
  }

  createExpenseType(expenseType: ExpenseType) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(expenseTypeRoute, JSON.stringify(expenseType), options)
      .map((response: Response) => <ExpenseType>response.json())
      .do(data => console.log('sending ', data.id))
      .catch(this.handleError);
  }

  readSingleExpenseType(id: string) {
    return this.http
      .get(expenseTypeRoute + id)
      .map((response: Response) => <ExpenseType>response.json())
      .catch(this.handleError);

  }

  updateExpenseType(expenseType: ExpenseType) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put(expenseTypeRoute + expenseType.id, JSON.stringify(expenseType), options)
      .map((res: Response) => <ExpenseType>res.json())
      .catch(this.handleError);
  }

  deleteExpenseType(expenseType: ExpenseType) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .delete(expenseTypeRoute + expenseType.id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error.status);
  }


}
