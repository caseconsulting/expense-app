import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
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
    public hireDate: number //Ask about this
  ) {}
}

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getEmployees(){
    return this.http
    .get(employeeRoute)
    .map((response: Response) => <Employee[]>response.json())
    .do(data => console.log(data))
    .catch(this.handleError);
  }

  createEmployee(employee: Employee)
  {
    console.log('making create call for ', employee.id);
    return this.http
    .post(employeeRoute, JSON.stringify(employee))
    .map((res:Response) =>{
       res.json();
       console.log(res)})
    .catch(this.handleError);
  }

  readSingleEmployee(id: string)
  {
     console.log('making read call for ', id);
    return this.http
    .get(employeeRoute + id)
    .map((response: Response) => <Employee>response.json())
    .do(data => console.log(data))
    .catch(this.handleError);

  }

  updateEmployee(employee: Employee)
  {
    console.log('making update call for ', employee.id);
    return this.http
    .put(employeeRoute + employee.id, JSON.stringify(employee))
    .map((res:Response) =>{
       res.json();
       console.log(res)})
    .catch(this.handleError);
  }

  deleteEmployee(id: string)
  {
    console.log('making delete call for ', id);
    return this.http
    .delete(employeeRoute + id)
    .map((res:Response) =>{
       res.json();
       console.log(res)})
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }


}
