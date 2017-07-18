import { Component, OnInit, Input } from '@angular/core';
import { Employee, EmployeeService} from '../employee/employee.service';
import { EmployeeListComponent } from '../employee/employee-list.component';
@Component({
  selector: 'exp-create-btn',
  templateUrl: './create-btn.component.html',
  styleUrls: ['./create-btn.component.css']
})
export class CreateBtnComponent implements OnInit {
  @Input() currentEmployee: Employee;
  constructor(private employeeService: EmployeeService, private employeeListComponent: EmployeeListComponent) { }

  ngOnInit() {
    console.log('in create-btn ', this.currentEmployee);
  }

  create(employee: Employee) {
    console.log('calling create on ', this.currentEmployee);
    this.employeeService.createEmployee(this.currentEmployee)
      .subscribe(
      () => { this.employeeListComponent.getEmployees() },
      currentEmployee => employee = currentEmployee
      );
  }

}
