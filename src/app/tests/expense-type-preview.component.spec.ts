// Angular testing utilities
import { Component, Input} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { ExpenseType, ExpenseTypeService} from '../expense-type/expense-type.service';
import { ErrorService} from '../error/error.service';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
// Component to be tested
import { ExpenseTypePreviewComponent } from '../expense-type-preview/expense-type-preview.component';

class MockExpenseTypeService {
  readSingleExpenseType(id: string) {
    return Observable.of('test');
  }
}

@Component({
  selector: 'exp-delete-confirm',
  template: `<h1>delete confirm</h1>`

})
class DeleteConfirmComponent {
  @Input() modelToDelte: ExpenseType;
}

let comp: ExpenseTypePreviewComponent;
let fixture: ComponentFixture<ExpenseTypePreviewComponent>;
let expenseTypeService;
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
        { path: 'expenseType', component: ExpenseTypePreviewComponent }
      ])
    ],
    declarations: [ExpenseTypePreviewComponent, DeleteConfirmComponent], // declare the test component
    providers: []
  });

  TestBed.overrideComponent(ExpenseTypePreviewComponent, {
    set: {
      providers: [
        { provide: ExpenseTypeService, useClass: MockExpenseTypeService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ErrorService
      ]
    }
  });
  fixture = TestBed.createComponent(ExpenseTypePreviewComponent);
  comp = fixture.componentInstance; // Component test instance
  expenseTypeService = fixture.debugElement.injector.get(ExpenseTypeService);
  errorService = fixture.debugElement.injector.get(ErrorService);
}

describe('ngOnInit', () => {
  let expenseType;
  beforeEach(() => {
    expenseType = false;
  });

  describe('if params has an id', () => {
    beforeEach(() => {
      setupTestBed();
      spyOn(expenseTypeService, 'readSingleExpenseType')
        .and.returnValue(Observable.of('test'));
    });
    it('sets model to corresponding expenseType', () => {
      fixture.detectChanges();
      expect(comp.model).toEqual('test');
      expect(expenseTypeService.readSingleExpenseType).toHaveBeenCalledWith(1);
    }); // title is Update
  }); // if params has an id

  describe('if params does not have an ID', () => {
    let errorStr;
    beforeEach(() => {
      errorStr = 'testError'
      mockActivatedRoute.params = Observable.from([{ 'id': undefined }]);
      setupTestBed();
      spyOn(expenseTypeService, 'readSingleExpenseType')
        .and.returnValue(Observable.throw(errorStr));
      spyOn(errorService, 'announceError');
    });
    it('throws error and does not set model', () => {
      fixture.detectChanges();
      expect(expenseTypeService.readSingleExpenseType).toHaveBeenCalled();
      expect(errorService.announceError).toHaveBeenCalled();
      expect(comp.model).toEqual(undefined);
    }); // title is Update
  }); // if params does not have an ID
}); // ngOnInit
