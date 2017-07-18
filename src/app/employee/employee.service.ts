import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const employeeRoute = 'http://localhost:3000/employees/';

export class Employee {

  constructor(
    public id: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public empId: number,
    public hireDate: number // Ask about this
  ) { }
}

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getEmployees() {
    return this.http
      .get(employeeRoute)
      .map((response: Response) => <Employee[]>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  createEmployee(employee: Employee) {
    console.log('making create call');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const testEmp = new Employee('', 'Black', 'Rawr', 'Panther', 57, 10101995);
    console.log('testing ', testEmp);
    return this.http
      .post(employeeRoute, JSON.stringify(testEmp), options)
      .map((res: Response) => {
        res.json();
        console.log(res)
      })
      .catch(this.handleError);
  }

  readSingleEmployee(id: string) {
    console.log('making read call for ', id);
    return this.http
      .get(employeeRoute + id)
      .map((response: Response) => <Employee>response.json())
      .do(data => console.log(data))
      .catch(this.handleError);

  }

  updateEmployee(employee: Employee) {
    console.log('making update call for ', employee.id);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const testEmp = new Employee(employee.id, 'Black', 'Rawr', 'Panther', 50, 10101995);
    console.log('testing ', testEmp);
    return this.http
      .put(employeeRoute + employee.id, JSON.stringify(testEmp), options)
      .map((res: Response) => {
        res.json();
        console.log(res)
      })
      .catch(this.handleError);
  }

  deleteEmployee(employee: Employee) {
    console.log('making delete call for ', employee);
     const headers = new Headers({ 'Content-Type': 'application/json' });
     const options = new RequestOptions({ headers: headers });

      return this.http
        .delete(employeeRoute + employee.id, options)
        .map((response: Response) => response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }


}
