import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { UpdateListService } from '../update-list.service';
import { Employee, EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'exp-employee-preview',
  templateUrl: './employee-preview.component.html',
  styleUrls: ['./employee-preview.component.css']
})
export class EmployeePreviewComponent implements OnInit {

  private id: any;
  employee: Employee;
  errorMessage: string;
  model: Employee;
  constructor(private employeeService: EmployeeService,
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
          error => this.errorMessage = <any>error
          ));
    }
  }

}
