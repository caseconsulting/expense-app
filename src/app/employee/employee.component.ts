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

import { Component, Input } from '@angular/core';
import { Employee } from './employee.service';

@Component({
  selector: 'currentEmployee',
   templateUrl: './employee.component.html'
})
export class EmployeeComponent {
  @Input() employee: Employee;
}
