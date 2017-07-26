import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


@Component({
  selector: 'exp-employee-form-create',
  templateUrl: './employee-form-create.component.html',
  styleUrls: ['./employee-form-create.component.css']
})
export class EmployeeFormCreateComponent implements OnInit {
  private id: any;
  model: Employee;
  employee: Employee;
  errorMessage: string;

  onSubmit(employee: Employee) {
    console.log('calling create on ', employee.firstName);
    this.employeeService.createEmployee(employee)
      .subscribe(
      () => {
        this.updateListService.announceUpdate('create')
      });
    //  error => this.errHandle.emit(error));
  }

  constructor(private location: Location,
    private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (!this.employee) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => this.employeeService.readSingleEmployee(this.id)
          .subscribe(
          returnedEmployee =>
            this.model = returnedEmployee,
          error => {
            this.model = new Employee('', '', '', '', '', '');
            this.errorMessage = <any>error
          }
          ));
    }
  }

  goBack(): void {
    this.location.back();
  }


  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
