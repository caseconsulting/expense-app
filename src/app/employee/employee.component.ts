// import { Component } from '@angular/core';
// import { Employee } from './employee.service';
//
// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css']
// })
// export class EmployeeComponent {
//   model = new Employee('John','Appleseed', 'Smith', 12345, 10101995);
//   submitted = false;
//   onSubmit() { this.submitted = true;}
//   get diagnostic() { return JSON.stringify(this.model); }
//
// }

import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Employee, EmployeeService } from './employee.service';

@Component({
  selector: 'exp-current-employee',
   templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnChanges {
  @Input() employee: Employee;
  @Output() clicked = new EventEmitter<Employee>();
  constructor(private employeeService: EmployeeService) { }

  // ngOnChanges detects when a change has occured on @input arguments
  ngOnChanges() {
    if (this.employee) {
     console.log(`>>> Call API for ${this.employee.firstName}`);
     // this would call your getEmployee service
     // you would need to do a subscribe below setting
     // the return value of the getCharacter call to your character
     this.employeeService.readSingleEmployee(this.employee.id)
     .subscribe(
      result => this.employee = result
      );
      console.log('passing employee ', this.employee, 'to  delete');
      this.clicked.emit(this.employee);
    }
  }

  delete(currentEmployee: Employee) {
    console.log('passing employee ', currentEmployee, 'to be deleted');
    // Emit an event 'clicked', which passes up the currentEmployee
    this.clicked.emit(currentEmployee);
  }

  update(currentEmployee: Employee) {
    console.log('passing employee ', currentEmployee, ' to be updated');
    // Emit an event 'clicked', which passes up the currentEmployee
    this.clicked.emit(currentEmployee);
  }

}
