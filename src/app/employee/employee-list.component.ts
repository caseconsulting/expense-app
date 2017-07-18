import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee, EmployeeService} from './employee.service';

@Component({
  selector: 'exp-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ['li {cursor: pointer;} .error {color:red;}'],
  providers: [EmployeeService]
})

export class EmployeeListComponent implements OnInit {
  @Output() changed = new EventEmitter<Employee>();

  errorMessage: string;
  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(
      employees => this.employees = employees,
      error => this.errorMessage = <any>error
      );
  }

  ngOnInit() { this.getEmployees(); }

  select(selectedEmployee: Employee) {
    console.log('before ', this.selectedEmployee);
    this.selectedEmployee = selectedEmployee;
    this.changed.emit(selectedEmployee);
    console.log('after ', this.selectedEmployee);
  }
}
