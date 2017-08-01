// Angular testing utilities
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Employee, EmployeeService} from '../../employee/employee.service';
import { UpdateListService } from '../../update-list.service';
import { ErrorService} from '../../error/error.service';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
// Component to be tested
import { EmployeeFormCreateComponent } from '../../employee-form-create/employee-form-create.component';

class MockEmployeeService {
  createEmployee(employee: Employee) {
    return Observable.of('test');
  }
  readSingleEmployee(employee: Employee) {
    return Observable.of('test');
  }
  updateEmployee(employee: Employee) {
    return Observable.of('test');
  }
}

describe('EmployeeFormCreateComponent (inline template)', () => {
  // Declare utilities and component
  let comp: EmployeeFormCreateComponent;
  let fixture: ComponentFixture<EmployeeFormCreateComponent>;
  let employeeService;
  let errorService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockActivatedRoute = { 'params': Observable.from([{ 'id': 1 }]) };

  function setupTestBed() {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'employee', component: EmployeeFormCreateComponent }
        ])
      ],
      declarations: [EmployeeFormCreateComponent], // declare the test component
      providers: []
    });

    TestBed.overrideComponent(EmployeeFormCreateComponent, {
      set: {
        providers: [
          { provide: EmployeeService, useClass: MockEmployeeService },
          { provide: Router, useValue: router },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          UpdateListService,
          ErrorService
        ]
      }
    });
    fixture = TestBed.createComponent(EmployeeFormCreateComponent);
    comp = fixture.componentInstance; // Component test instance
    employeeService = fixture.debugElement.injector.get(EmployeeService);
    errorService = fixture.debugElement.injector.get(ErrorService);
  }

  describe('onSubmit', () => {
    let title;

    const employee = new Employee('test', 'test', 'test', 'test', 'test', 'test');
    describe(' When creating new employee', () => {
      beforeEach(() => {
        setupTestBed();
        title = 'Create';
        comp.title = title;
      });

      describe('gets response from observable', () => {
        beforeEach(() => {
          spyOn(employeeService, 'createEmployee')
            .and.returnValue(Observable.of('test'));
        });
        afterEach(() => {
          expect(employeeService.createEmployee).toHaveBeenCalledWith(employee);
          expect(router.navigate).toHaveBeenCalledWith(['/employee', undefined]);
        });
        it('will call createEmployee', () => {
          employeeService.createEmployee(employee);
          comp.onSubmit(employee);
        }); // will call createEmployee
      }); // gets response from observable

      describe('throws an error ', () => {
        const errorStr = 'testError';
        beforeEach(() => {
          spyOn(employeeService, 'createEmployee')
            .and.returnValue(Observable.throw(errorStr));
          spyOn(errorService, 'announceError');
        });
        afterEach(() => {
          expect(errorService.announceError)
            .toHaveBeenCalledWith({ status: errorStr, type: 'Employee' });
        });
        it('announces the error', () => {
          comp.onSubmit(employee);
        }); // announces the error
      }); // throws an error
    }); // When creating new employee

    describe(' When creating new employee', () => {
      beforeEach(() => {
        title = 'Update';
        comp.title = title;
      });

      describe('gets response from observable', () => {
        beforeEach(() => {
          spyOn(employeeService, 'updateEmployee')
            .and.returnValue(Observable.of('test'));
        });
        afterEach(() => {
          expect(employeeService.updateEmployee).toHaveBeenCalledWith(employee);
          expect(router.navigate).toHaveBeenCalledWith(['/employee', undefined]);
        });
        it('will call updateEmployee', () => {
          employeeService.updateEmployee(employee);
          comp.onSubmit(employee);
        }); // will call updateEmployee
      }); // gets response from observable

      describe('throws an error ', () => {
        const errorStr = 'testError';
        beforeEach(() => {
          spyOn(employeeService, 'updateEmployee')
            .and.returnValue(Observable.throw(errorStr));
          spyOn(errorService, 'announceError');
        });
        afterEach(() => {
          expect(errorService.announceError)
            .toHaveBeenCalledWith({ status: errorStr, type: 'Employee' });
        });
        it('announces the error', () => {
          comp.onSubmit(employee);
        }); // announces the error
      }); // throws an error
    }); // When creating new employee
  }); // onSubmit

  describe('ngOnInit', () => {
    let employee;
    beforeEach(() => {
      employee = false;
    });

    describe('if params has an id', () => {
      beforeEach(() => {
        setupTestBed();
        spyOn(employeeService, 'readSingleEmployee')
          .and.returnValue(Observable.of('test'));
      });
      it('title is Update', () => {
        fixture.detectChanges();
        expect(comp.title).toEqual('Update');
        expect(comp.model).toEqual('test');
      }); // title is Update
    }); // if params has an id

    describe('if params does not have an ID', () => {
      beforeEach(() => {
        mockActivatedRoute.params = Observable.from([{ 'id': undefined }]);
        setupTestBed();
      });
      it('title is Update', () => {
        fixture.detectChanges();
        expect(comp.title).toEqual('Create');
        expect(comp.model).toEqual(new Employee('', '', '', '', '', ''));
      }); // title is Update
    }); // if params does not have an ID
  }); // ngOnInit
});
