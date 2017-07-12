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
    this.selectedEmployee = employee;
  }
}
