import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import { UpdateListService } from '../../update-list.service';
import { Employee, EmployeeService } from '../../employee/employee.service';


@Component({
  selector: 'exp-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnChanges {
  @Input() employee: Employee;
  //  @Output() clicked = new EventEmitter<Employee>();
  @Output() errHandle = new EventEmitter<any>();
  @Output() removeFromList = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  model: Employee;
  editing = false;
  onSubmit() { this.editing = true; }

  constructor(private employeeService: EmployeeService, private updateListService: UpdateListService) { }

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
      this.model = new Employee('', this.employee.firstName,
        this.employee.middleName, this.employee.lastName,
        this.employee.empId, this.employee.hireDate);
      console.log('passing employee ', this.employee, 'to  delete');
      //  this.clicked.emit(this.employee);
    }
  }

  delete(confirmed: boolean) {
    if (confirmed) {
      console.log('calling delete on ', this.employee);
      this.employeeService.deleteEmployee(this.employee)
        .subscribe(
        () => this.updateListService.announceUpdate('remove'),
        error => this.errHandle.emit(error)
        );
    }
  }
  update(employee: Employee) {
    console.log('calling update on ', this.employee.id);
    employee.id = this.employee.id;
    this.employeeService.updateEmployee(employee)
      .subscribe(
      () => {
        this.updateListService.announceUpdate('update');
        this.editing = false;
      },
      error => this.errHandle.emit(error)
      );
  }

  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
