import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ErrorService } from '../error/error.service';


@Component({
  selector: 'exp-employee-form-create',
  templateUrl: './employee-form-create.component.html',
  styleUrls: ['./employee-form-create.component.css']
})
export class EmployeeFormCreateComponent implements OnInit {
  private id: any;
  model: Employee;
  employee: Employee;
  title = '';

  onSubmit(employee: Employee) {
    // console.log('calling create on ', employee.firstName);
    this.employeeService.createEmployee(employee)
      .subscribe(
      (res) => {
        this.router.navigate(['/employee', res.id]); // preview
        this.updateListService.announceUpdate('create'); // update the list
      },
      error => this.errorService.announceError({ status: error, type: 'Employee' })
      );
    //  error => this.errHandle.emit(error));
  }

  constructor(private location: Location,
    private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    if (!this.employee) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => {
          if (id) {
            this.employeeService.readSingleEmployee(this.id)
              .subscribe(
              returnedEmployee => {
                this.model = returnedEmployee;
                this.title = 'Update';
              },
              error => this.errorService.announceError(error))
          } else {
            this.model = new Employee('', '', '', '', '', '');
            this.title = 'Create';
          }
        });
    }
  }

  goBack(): void {
    this.location.back();
  }


  // keep this last
  // TODO remove when finished testing
  get diagnostic() { return JSON.stringify(this.model); }
}
