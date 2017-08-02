import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { EmployeeListComponent } from '../employee/employee-list.component';
import { Employee, EmployeeService} from '../employee/employee.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService} from '../error/error.service';

class MockEmployeeService {
  getEmployees() {
    return Observable.of('test');
  }
}

describe('EmployeeListComponent', function() {
  let comp: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService;
  let errorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'create', component: EmployeeListComponent }
        ])
      ],
      declarations: [EmployeeListComponent]
    });

    TestBed.overrideComponent(EmployeeListComponent, {
      set: {
        providers: [
          { provide: EmployeeService, useClass: MockEmployeeService },
          UpdateListService,
          ErrorService
        ]
      }
    })
    fixture = TestBed.createComponent(EmployeeListComponent);
    comp = fixture.componentInstance;
    employeeService = fixture.debugElement.injector.get(EmployeeService);
    errorService = fixture.debugElement.injector.get(ErrorService);
  });

  describe('getEmployees', () => {

    afterEach(() => {
      expect(employeeService.getEmployees).toHaveBeenCalled();
    });

    describe('when successful', () => {
      beforeEach(() => {
        spyOn(employeeService, 'getEmployees')
          .and.returnValue(Observable.of('test'));
        comp.getEmployees();
      });

      it('sets employees to value from service', () => {
        expect(comp.employees).toEqual('test');
      });
    });

    describe('when not succcessful', () => {
      let errorStr;
      beforeEach(() => {
        errorStr = 'testError';
        spyOn(employeeService, 'getEmployees')
          .and.returnValue(Observable.throw(errorStr));
        comp.getEmployees();
        spyOn(errorService, 'announceError');
        comp.getEmployees();
      });

      it('sets employees to value from service', () => {
        expect(errorService.announceError)
        .toHaveBeenCalledWith({ status: errorStr, type: 'Employee' });
      });
    });
  }); // getEmployees

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(comp, 'getEmployees');
      });

      describe('OnInit has been called', () => {
        it('calls getEmployees', () => {
          // detects OnInit event
          fixture.detectChanges();
          expect(comp.getEmployees).toHaveBeenCalled();
        }); // calls getEmployees
      }); // OnInit has been called

      describe('OnInit is never called', () => {
        it('does not call getEmployees', () => {
          expect(comp.getEmployees).not.toHaveBeenCalled();
        }); // does not call getEmployees
      }); // OnInit is never called
  }); // ngOnInit

  describe('updateList', () => {
    let caller;
    describe('caller is anything but remove', () => {
      beforeEach(() => {
        caller = 'form';
        // removeRoute = ['/'];
        spyOn(comp, 'getEmployees');
        });
        afterEach(() => {
          expect(comp.getEmployees).toHaveBeenCalled();
          });
      it(' updates the list', () => {
        comp.updateList(caller);
      }); // router navigates back to home
    }); // caller is remove
    describe('caller is remove', () => {
      beforeEach(() => {
        caller = 'remove';
        // removeRoute = ['/'];
        spyOn(comp, 'getEmployees');
        });
        afterEach(() => {
          expect(comp.getEmployees).toHaveBeenCalled();
          // expect(router.navigate).toHaveBeenCalledWith(removeRoute);
          });
      it(' updates the list, navigates to root', () => {
        comp.updateList(caller);
      }); // router navigates back to home
    }); // caller is remove
  }); // updateList
});
