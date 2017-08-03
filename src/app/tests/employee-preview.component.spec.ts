// Angular testing utilities
import { Component, Input} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Employee, EmployeeService} from '../employee/employee.service';
import { ErrorService} from '../error/error.service';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
// Component to be tested
import { EmployeePreviewComponent } from '../employee-preview/employee-preview.component';

class MockEmployeeService {
  readSingleEmployee(id: string) {
    return Observable.of('test');
  }
}

@Component({
  selector: 'exp-delete-confirm',
  template: `<h1>delete confirm</h1>`

})
class DeleteConfirmComponent {
  @Input() modelToDelte: Employee;
}

let comp: EmployeePreviewComponent;
let fixture: ComponentFixture<EmployeePreviewComponent>;
let employeeService;
let errorService;
const router = {
  navigate: jasmine.createSpy('navigate')
}
const mockActivatedRoute = { 'params': Observable.from([{ 'id': 1 }]) };

function setupTestBed() {
  TestBed.configureTestingModule({
    imports: [
      CommonModule,
      RouterTestingModule.withRoutes([
        { path: 'employee', component: EmployeePreviewComponent }
      ])
    ],
    declarations: [EmployeePreviewComponent, DeleteConfirmComponent], // declare the test component
    providers: []
  });

  TestBed.overrideComponent(EmployeePreviewComponent, {
    set: {
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ErrorService
      ]
    }
  });
  fixture = TestBed.createComponent(EmployeePreviewComponent);
  comp = fixture.componentInstance; // Component test instance
  employeeService = fixture.debugElement.injector.get(EmployeeService);
  errorService = fixture.debugElement.injector.get(ErrorService);
}

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
    it('sets model to corresponding employee', () => {
      fixture.detectChanges();
      expect(comp.model).toEqual('test');
      expect(employeeService.readSingleEmployee).toHaveBeenCalledWith(1);
    }); // title is Update
  }); // if params has an id

  describe('if params does not have an ID', () => {
    let errorStr;
    beforeEach(() => {
      errorStr = 'testError'
      mockActivatedRoute.params = Observable.from([{ 'id': undefined }]);
      setupTestBed();
      spyOn(employeeService, 'readSingleEmployee')
        .and.returnValue(Observable.throw(errorStr));
      spyOn(errorService, 'announceError');
    });
    it('throws error and does not set model', () => {
      fixture.detectChanges();
      expect(employeeService.readSingleEmployee).toHaveBeenCalled();
      expect(errorService.announceError).toHaveBeenCalled();
      expect(comp.model).toEqual(undefined);
    }); // title is Update
  }); // if params does not have an ID
}); // ngOnInit
