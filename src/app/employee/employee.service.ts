import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class Employee {

  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public empId: number,
    public hireDate: number //Ask about this
  ) {}
}

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getEmployees(){
    let apiCall = 'http://localhost:3000/employees/';
    return this.http
    .get(apiCall)
    .map((response: Response) => <Employee[]>response.json())
    .do(data => console.log(data))
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
