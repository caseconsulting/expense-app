import { Component } from '@angular/core';
import { Employee, EmployeeService} from './employee.service';

@Component({
  selector: 'employee-list',
   templateUrl: './employee-list.component.html',
  styles: ['li {cursor: pointer;} .error {color:red;}'],
  providers: [EmployeeService]
})

export class EmployeeListComponent {
  errorMessage: string;
  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(
        employees => this.employees = employees,
        error =>  this.errorMessage = <any>error
    );
  }

  ngOnInit() { this.getEmployees(); }

  select(employee: Employee) {
    // console.log(employee);
    // console.log(this.employeeService.readSingleEmployee(employee.id));
    this.employeeService.readSingleEmployee(employee.id)
    .subscribe(
      result =>
      {
        this.selectedEmployee = result;
        console.log("result of subscribe ", result);
        console.log('selectedEmployee in sub ', this.selectedEmployee);
        console.log('this is ', this);
        return this.selectedEmployee;

      },
      error =>  this.errorMessage = <any>error
    );
    console.log('this other is ', this);
    console.log("final value of selected employee should be ", this.selectedEmployee);
  }
}
