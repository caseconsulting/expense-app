// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'exp-employee-form-create',
//   templateUrl: './employee-form-create.component.html',
//   styleUrls: ['./employee-form-create.component.css']
// })
// export class EmployeeFormCreateComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';


@Component({
  selector: 'exp-employee-form-create',
  templateUrl: './employee-form-create.component.html',
  styleUrls: ['./employee-form-create.component.css']
})
export class EmployeeFormCreateComponent {
  @Output() errHandle = new EventEmitter<any>();
  @Output() updateList = new EventEmitter<boolean>();

  reviewing = false;
  model = new Employee('', '', '', '', '', '');

  onSubmit() { this.reviewing = true; }

  constructor(private employeeService: EmployeeService) { }

  create(employee: Employee) {
    console.log('calling create on ', employee.firstName);
    this.employeeService.createEmployee(employee)
      .subscribe(
      () => {
        this.updateList.emit(true);
        this.reviewing = false;
      },
      error => this.errHandle.emit(error)
      );
  }

  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
