import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Location, CommonModule } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { Employee, EmployeeService } from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService } from '../error/error.service';

class MockEmployeeService {
  deleteEmployee() {
    return Observable.of('test');
  }
}
class MockNgbModal {
  open() {
    return Promise.resolve('test');
  }
}

describe('DeleteConfirmComponent', () => {
  let component: DeleteConfirmComponent;
  let fixture: ComponentFixture<DeleteConfirmComponent>;
  let employeeService, modalService, errorService, updateListService;
  const content = '#content';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'delete', component: DeleteConfirmComponent }
        ])
      ],
      declarations: [DeleteConfirmComponent]
    });

    TestBed.overrideComponent(DeleteConfirmComponent, {
      set: {
        providers: [
          { provide: EmployeeService, useClass: MockEmployeeService },
          UpdateListService,
          ErrorService,
          { provide: NgbModal, useClass: MockNgbModal }
        ]
      }
    })
    fixture = TestBed.createComponent(DeleteConfirmComponent);
    component = fixture.componentInstance;
    employeeService = fixture.debugElement.injector.get(EmployeeService);
    updateListService = fixture.debugElement.injector.get(UpdateListService);
    errorService = fixture.debugElement.injector.get(ErrorService);
    modalService = fixture.debugElement.injector.get(NgbModal);
  });
  describe('confirmDelete', () => {

    afterEach(() => {
      expect(employeeService.deleteEmployee).toHaveBeenCalledWith(component.modelToDelte);
    });
    describe('when successful', () => {
      beforeEach(() => {
        spyOn(employeeService, 'deleteEmployee')
          .and.returnValue(Observable.of('test'));
        spyOn(updateListService, 'announceUpdate');
        spyOn(errorService, 'announceError');
      });
      afterEach(() => {
        expect(updateListService.announceUpdate).toHaveBeenCalledWith('remove');
        expect(errorService.announceError).not.toHaveBeenCalled();
      });
      it('deletes the employee and returns an observable', () => {
        component.confirmDelete();
      });
    });

    describe('when not successful', () => {
      let errorStr;
      beforeEach(() => {
        errorStr = 'testError'
        spyOn(employeeService, 'deleteEmployee')
          .and.returnValue(Observable.throw(errorStr));
        spyOn(updateListService, 'announceUpdate');
        spyOn(errorService, 'announceError');
      });
      afterEach(() => {
        expect(errorService.announceError).toHaveBeenCalledWith({ status: errorStr, type: 'Employee' });
        expect(updateListService.announceUpdate).not.toHaveBeenCalled();
      });
      it('does not delete the employee and calls errorService', () => {
        component.confirmDelete();
      });
    });

  });

  // Problem: Return a promise and check to see if service was called
  xdescribe('open', () => {
    let contents;
    beforeEach(() => {
      contents = '{content}';
      spyOn(modalService, 'open').and.returnValue('{result}');
      afterEach(() => {
        expect(modalService.open).toHaveBeenCalled();
      });
      it('should make a call to modalService', () => {
        component.open(content);
      });
    });
  }); // open
});
