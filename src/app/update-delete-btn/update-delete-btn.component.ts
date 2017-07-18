import { Component, OnInit, Input } from '@angular/core';
import { Employee, EmployeeService} from '../employee/employee.service';
import { EmployeeListComponent } from '../employee/employee-list.component';
@Component({
  selector: 'exp-update-delete-btn',
  templateUrl: './update-delete-btn.component.html',
  styleUrls: ['./update-delete-btn.component.css']
})
export class UpdateDeleteBtnComponent implements OnInit {
  @Input() currentEmployee: Employee;

  constructor(private employeeService: EmployeeService, private employeeListComponent: EmployeeListComponent) { }

  ngOnInit() {
    console.log('in create-btn ', this.currentEmployee);
  }

  delete(employee: Employee) {
    console.log('calling delete on ', this.currentEmployee);
    this.employeeService.deleteEmployee(this.currentEmployee)
      .subscribe(
      () => { this.employeeListComponent.getEmployees() },
      currentEmployee => employee = currentEmployee
      );
  }
  update(employee: Employee) {
    console.log('calling update on ', this.currentEmployee);
    this.employeeService.updateEmployee(this.currentEmployee)
      .subscribe(
      () => { this.employeeListComponent.getEmployees() },
      currentEmployee => employee = currentEmployee
      );
  }

}
