import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Employee, EmployeeService } from '../../employee/employee.service';
import { EmployeeListComponent } from '../../employee/employee-list.component';

@Component({
  selector: 'exp-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnChanges {
  @Input() focusedEmployee: Employee;
  @Output() clicked = new EventEmitter<Employee>();

  model: Employee;
  editing = false;
  onSubmit() { this.editing = true; }

  constructor(private employeeService: EmployeeService, private employeeListComponent: EmployeeListComponent) { }

  showFormControls(form: any) {
    return form && form.controls['firstName'] &&
      form.controls['firstName'].value; // Dr. IQ
  }
  ngOnChanges() {
    if (this.focusedEmployee) {
      console.log(`>>> Call API for ${this.focusedEmployee.firstName}`);
      // this would call your getEmployee service
      // you would need to do a subscribe below setting
      // the return value of the getCharacter call to your character
      this.employeeService.readSingleEmployee(this.focusedEmployee.id)
        .subscribe(
        result => this.focusedEmployee = result
        );
      this.model = new Employee('', this.focusedEmployee.firstName,
        this.focusedEmployee.middleName, this.focusedEmployee.lastName,
        this.focusedEmployee.empId, this.focusedEmployee.hireDate);

      console.log('passing employee ', this.focusedEmployee, 'to  delete');
      this.clicked.emit(this.focusedEmployee);
    }
  }

  delete(employee: Employee) {
    console.log('calling delete on ', this.focusedEmployee);
    this.employeeService.deleteEmployee(this.focusedEmployee)
      .subscribe(
      () => { this.employeeListComponent.getEmployees() },
      focusedEmployee => employee = focusedEmployee
      );
  }
  update(employee: Employee) {
    console.log('calling update on ', this.focusedEmployee);
    this.employeeService.updateEmployee(this.focusedEmployee)
      .subscribe(
      () => { this.employeeListComponent.getEmployees() },
      focusedEmployee => employee = focusedEmployee
      );
  }

  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
