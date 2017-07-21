import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee, EmployeeService} from './employee.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'exp-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ['li {cursor: pointer;} .error {color:red;}'],
  providers: [EmployeeService, UpdateListService]
})

export class EmployeeListComponent implements OnInit {
  @Output() changed = new EventEmitter<Employee>();

  errorMessage: string;
  selectedEmployee: Employee;
  employees: Employee[];
  subscription: Subscription;
  reloadList = false;

  constructor(private employeeService: EmployeeService, private updateListService: UpdateListService) {

    this.subscription = updateListService.updateAnnounced$.subscribe(
      caller => this.updateList(caller)
    )
  }

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

  removeFromList(isChanged: boolean) {
    if (isChanged) {
      this.getEmployees();
      this.selectedEmployee = null;
    }
  }

  updateList(caller: string) {
    this.getEmployees();
    if (caller === 'remove') {
      this.selectedEmployee = null;
    }
  }

  errHandle(err: any) {
    this.errorMessage = err;
    console.log('calling error', err);
  }
}
