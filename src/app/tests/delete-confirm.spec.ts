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

xdescribe('DeleteConfirmComponent', () => {
  let component: DeleteConfirmComponent;
  let fixture: ComponentFixture<DeleteConfirmComponent>;
  let employeeService, modalService, errorService;
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
    errorService = fixture.debugElement.injector.get(ErrorService);
    modalService = fixture.debugElement.injector.get(NgbModal);
  });
  describe('open', () => {
    let thenFunction;
    afterEach(() => {
      // expect(employeeService.deleteEmployee).toHaveBeenCalled();
    });
    describe('when successful', () => {
      beforeEach(() => {
        thenFunction = jasmine.any(Function);
        spyOn(modalService, 'open')
          .and.returnValue(Promise.resolve);

      });

      it('sets employees to value from service', () => {
        component.open(content);
        expect(component.open).toHaveBeenCalled();
      });
    });
    describe('when not succcessful', () => {
      let errorStr;
      beforeEach(() => {
        errorStr = 'testError';
        spyOn(modalService, 'open')
          .and.returnValue(Observable.throw(errorStr));
        component.open(content);
        spyOn(errorService, 'announceError');
        component.open(content);

      });
      it('sets employees to value from service', () => {
        expect(errorService.announceError).toHaveBeenCalledWith({ status: errorStr, type: 'Employee' });
      });
    });
  });
});
