import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeListComponent } from '../../employee/employee-list.component';
import { Employee, EmployeeService} from '../../employee/employee.service';
import { UpdateListService } from '../../update-list.service';
import { Http } from '@angular/http';
import { ErrorService} from '../../error/error.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

class MockEmployeeService {
  getEmployees() {
    return Observable.of('test');
  }
}


// @Component({
//   template: `
//     <a routerLink="/create">link</a>
//     <router-outlet></router-outlet>
//   `
// })
// class TestComponent {
//   collName = 'testing';
//   item = {
//     _id: 1
//   };
// }
//
// @Component({
//   template: ''
// })
// class DummyComponent {
// }

fdescribe('EmployeeListComponent', function() {
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
        expect(errorService.announceError).toHaveBeenCalledWith({ status: errorStr, type: 'Employee' });
      });
    });
  });
});
