import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const employeeRoute = 'http://localhost:3000/employees/';

/**
*@param id
*@param firstName
*@param middleName
*@param lastName
*@param empId
*@param hireDate
*/

export class Employee {

  constructor(
    public id: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public empId: string,
    public hireDate: string
  ) { }
}

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getEmployees() {
    return this.http
      .get(employeeRoute)
      .map((response: Response) => <Employee[]>response.json())
      .catch(this.handleError);
  }

  createEmployee(employee: Employee) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(employeeRoute, JSON.stringify(employee), options)
      .map((response: Response) => <Employee>response.json())
      .do(data => console.log('sending ', data.id))
      .catch(this.handleError);
  }

  readSingleEmployee(id: string) {
    return this.http
      .get(employeeRoute + id)
      .map((response: Response) => <Employee>response.json())
      .catch(this.handleError);

  }

  updateEmployee(employee: Employee) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });


    return this.http
      .put(employeeRoute + employee.id, JSON.stringify(employee), options)
      .map((res: Response) => <Employee>res.json())
      .catch(this.handleError);
  }

  deleteEmployee(employee: Employee) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .delete(employeeRoute + employee.id, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }


}
