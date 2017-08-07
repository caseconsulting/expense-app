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
  @Input() modelToDelete: Employee;
  closeResult: string;
  constructor(private modalService: NgbModal,
    private employeeService: EmployeeService,
    private updateListService: UpdateListService,
    private errorService: ErrorService) { }

confirmDelete() {
  this.employeeService.deleteEmployee(this.modelToDelete)
    .subscribe(
    () => { this.updateListService.announceUpdate('remove') },
    error => this.errorService.announceError({ status: error, type: 'Employee' })
    );
}

  open(content) {
    // lol...
    this.modalService.open(content).result.then(this.confirmDelete.bind(this));
  }
}
