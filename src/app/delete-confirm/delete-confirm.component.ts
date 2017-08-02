import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Employee, EmployeeService } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService } from '../error/error.service';
@Component({
  selector: 'exp-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
  @Input() modelToDelte: Employee;
  closeResult: string;
  constructor(private modalService: NgbModal,
    private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private errorService: ErrorService) { }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // call delete here inside the promise. When the promise resolves, delete has been
      // clicked and these instructions will execute

      this.employeeService.deleteEmployee(this.modelToDelte)
        .subscribe(
        () => { this.updateListService.announceUpdate('remove') },
        error => this.errorService.announceError({ status: error, type: 'Employee' })
        );
    });
  }
}
