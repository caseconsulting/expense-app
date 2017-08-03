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
  id: any;
  model: Employee;
  employee: Employee;
  title = '';

  onSubmit(employee: Employee) {
    let result;
    console.log('not me');
    if (this.title === 'Create') {
      result = this.employeeService.createEmployee(employee);
    } else {
      result = this.employeeService.updateEmployee(employee);
    }

    result.subscribe(
      (res) => {
        this.router.navigate(['/employees', res.id]); // preview
        this.updateListService.announceUpdate('form'); // update the list
      },
      error => this.errorService.announceError({ status: error, type: 'Employee' })
    );
  }

  constructor(private location: Location,
    private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    console.log(this.employee, '**');
    console.log(this.route.params)
    if (!this.employee) {
      this.route
        .params
        .map(params => params['id'])
        .do(id => this.id = id)
        .subscribe(id => {
          if (id) {
            console.log(id);
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
     if (this.title === 'Update') {
       this.router.navigate(['/employees', this.model.id]); // preview
     } else {
       this.router.navigate(['/employees']); // list
     }
  }
}
