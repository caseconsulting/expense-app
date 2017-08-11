import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from '../error/error.service';
import * as moment from 'moment';

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

  constructor(private location: Location,
    private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private parser: NgbDateParserFormatter) { }

    ngOnInit() {
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
                console.log('Before', this.model.hireDate);
                this.model.hireDate = this.dateStringToObject(this.model.hireDate);
                console.log('After', this.model.hireDate);
              },
              error => this.errorService.announceError(error));
            } else {
              this.model = new Employee('', '', '', '', '', '', []);
              this.title = 'Create';
            }
          });
        }
      }

  onSubmit(employee: Employee) {
    let result;
    console.log('Employee sent to server: ', employee);
    this.model.hireDate = this.dateToString(this.model.hireDate);
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

  dateToString(date) {
    const dateString = new Date(`${date.month}/${date.day}/${date.year}`);
    console.log('date string', dateString)
    const momentDate: moment.Moment = moment(dateString);
    console.log(momentDate);
    return momentDate.format('YYYY-MM-DD');
  }

dateStringToObject(date: string) {
  return this.parser.parse(date);
}

  goBack(): void {
     if (this.title === 'Update') {
       this.router.navigate(['/employees', this.model.id]); // preview
     } else {
       this.router.navigate(['/employees']); // list
     }
  }
}
