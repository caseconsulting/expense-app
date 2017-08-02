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

import { ExpenseTypeListComponent } from '../expense-type/expense-type-list.component';
import { ExpenseType, ExpenseTypeService} from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService} from '../error/error.service';

class MockExpenseTypeService {
  getExpenseTypes() {
    return Observable.of('test');
  }
}

fdescribe('ExpenseTypeListComponent', function() {
  let comp: ExpenseTypeListComponent;
  let fixture: ComponentFixture<ExpenseTypeListComponent>;
  let employeeService;
  let errorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'create', component: ExpenseTypeListComponent }
        ])
      ],
      declarations: [ExpenseTypeListComponent]
    });

    TestBed.overrideComponent(ExpenseTypeListComponent, {
      set: {
        providers: [
          { provide: ExpenseTypeService, useClass: MockExpenseTypeService },
          UpdateListService,
          ErrorService
        ]
      }
    })
    fixture = TestBed.createComponent(ExpenseTypeListComponent);
    comp = fixture.componentInstance;
    employeeService = fixture.debugElement.injector.get(ExpenseTypeService);
    errorService = fixture.debugElement.injector.get(ErrorService);
  });

  describe('getExpenseTypes', () => {

    afterEach(() => {
      expect(employeeService.getExpenseTypes).toHaveBeenCalled();
    });

    describe('when successful', () => {
      beforeEach(() => {
        spyOn(employeeService, 'getExpenseTypes')
          .and.returnValue(Observable.of('test'));
        comp.getExpenseTypes();
      });

      it('sets expenseTypes to value from service', () => {
        expect(comp.expenseTypes).toEqual('test');
      });
    });

    describe('when not succcessful', () => {
      let errorStr;
      beforeEach(() => {
        errorStr = 'testError';
        spyOn(employeeService, 'getExpenseTypes')
          .and.returnValue(Observable.throw(errorStr));
        comp.getExpenseTypes();
        spyOn(errorService, 'announceError');
        comp.getExpenseTypes();
      });

      it('sets expenseTypes to value from service', () => {
        expect(errorService.announceError)
        .toHaveBeenCalledWith({ status: errorStr, type: 'Expense Type' });
      });
    });
  }); // getExpenseTypes

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(comp, 'getExpenseTypes');
      });

      describe('OnInit has been called', () => {
        it('calls getExpenseTypes', () => {
          // detects OnInit event
          fixture.detectChanges();
          expect(comp.getExpenseTypes).toHaveBeenCalled();
        }); // calls getExpenseTypes
      }); // OnInit has been called

      describe('OnInit is never called', () => {
        it('does not call getExpenseTypes', () => {
          expect(comp.getExpenseTypes).not.toHaveBeenCalled();
        }); // does not call getExpenseTypes
      }); // OnInit is never called
  }); // ngOnInit

  describe('updateList', () => {
    let caller;
    describe('caller is anything but remove', () => {
      beforeEach(() => {
        caller = 'form';
        // removeRoute = ['/'];
        spyOn(comp, 'getExpenseTypes');
        });
        afterEach(() => {
          expect(comp.getExpenseTypes).toHaveBeenCalled();
          });
      it(' updates the list', () => {
        comp.updateList(caller);
      }); // router navigates back to home
    }); // caller is remove
    describe('caller is remove', () => {
      beforeEach(() => {
        caller = 'remove';
        // removeRoute = ['/'];
        spyOn(comp, 'getExpenseTypes');
        });
        afterEach(() => {
          expect(comp.getExpenseTypes).toHaveBeenCalled();
          // expect(router.navigate).toHaveBeenCalledWith(removeRoute);
          });
      it(' updates the list, navigates to root', () => {
        comp.updateList(caller);
      }); // router navigates back to home
    }); // caller is remove
  }); // updateList
});
