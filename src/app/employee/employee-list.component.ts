import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee, EmployeeService} from './employee.service';
import { UpdateListService } from '../update-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'exp-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['employee-list.component.css'],
  providers: [EmployeeService, UpdateListService]
})

export class EmployeeListComponent implements OnInit {
  // TODO If this is removed remove Output from the imports as well
  // @Output() changed = new EventEmitter<Employee>();

  selectedEmployee: Employee;
  employees: Employee[];
  subscription: Subscription;

  constructor(private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private router: Router,
    private errorService: ErrorService) {

    this.subscription = updateListService.updateAnnounced$.subscribe(
      caller => this.updateList(caller)
    )
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(
      employees => this.employees = employees,
      error => this.errorService.announceError({ status: error, type: 'Employee' })
      );
  }

  ngOnInit() { this.getEmployees(); }

  // select(selectedEmployee: Employee) {
  //   console.log('before ', this.selectedEmployee);
  //   this.selectedEmployee = selectedEmployee;
  //   // this.changed.emit(selectedEmployee);
  //   console.log('after ', this.selectedEmployee);
  // }

  updateList(caller: string) {
    this.getEmployees();
    if (caller === 'remove') {
      this.router.navigate(['/']);
    }
  }
}
