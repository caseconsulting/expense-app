import { Component } from '@angular/core';
import { Employee } from '../../employee/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  model = new Employee('', 'John', 'Appleseed', 'Smith', 12345, 10101995);
  submitted = false;
  onSubmit() { this.submitted = true; }

  showFormControls(form: any) {
    return form && form.controls['firstName'] &&
    form.controls['firstName'].value; // Dr. IQ
  }


  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
