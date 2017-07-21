import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';


@Component({
  selector: 'exp-employee-form-create',
  templateUrl: './employee-form-create.component.html',
  styleUrls: ['./employee-form-create.component.css']
})
export class EmployeeFormCreateComponent {
  @Output() errHandle = new EventEmitter<any>();
  @Output() hideView = new EventEmitter<boolean>();
  @Input() buttonClicked: boolean;
  reviewing = false;
  model = new Employee('', '', '', '', '', '');

  onSubmit() { this.reviewing = true; }

  constructor(private employeeService: EmployeeService, private updateListService: UpdateListService) { }

  create(employee: Employee) {
    console.log('calling create on ', employee.firstName);
    this.employeeService.createEmployee(employee)
      .subscribe(
      () => {
        this.updateListService.announceUpdate('create');
        this.hideSubmission(true);

      },
      error => this.errHandle.emit(error)
      );
  }

  hideSubmission(remove: boolean) {
    console.log('canceling submission ', remove);
    this.hideView.emit(false);
  }

  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
