// Angular testing utilities
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { ExpenseType, ExpenseTypeService} from '../expense-type/expense-type.service';
import { UpdateListService } from '../update-list.service';
import { ErrorService} from '../error/error.service';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
// Component to be tested
import { ExpenseTypeFormComponent } from '../expense-type-form/expense-type-form.component';

class MockExpenseTypeService {
  createExpenseType(expenseType: ExpenseType) {
    return Observable.of('test');
  }
  readSingleExpenseType(expenseType: ExpenseType) {
    return Observable.of('test');
  }
  updateExpenseType(expenseType: ExpenseType) {
    return Observable.of('test');
  }
}

describe('ExpenseTypeFormComponent', () => {
  // Declare utilities and component
  let comp: ExpenseTypeFormComponent;
  let fixture: ComponentFixture<ExpenseTypeFormComponent>;
  let expenseTypeService;
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
          { path: 'expense-type', component: ExpenseTypeFormComponent }
        ])
      ],
      declarations: [ExpenseTypeFormComponent], // declare the test component
      providers: []
    });

    TestBed.overrideComponent(ExpenseTypeFormComponent, {
      set: {
        providers: [
          { provide: ExpenseTypeService, useClass: MockExpenseTypeService },
          { provide: Router, useValue: router },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          UpdateListService,
          ErrorService
        ]
      }
    });
    fixture = TestBed.createComponent(ExpenseTypeFormComponent);
    comp = fixture.componentInstance; // Component test instance
    expenseTypeService = fixture.debugElement.injector.get(ExpenseTypeService);
    errorService = fixture.debugElement.injector.get(ErrorService);
  }

  describe('onSubmit', () => {
    let title;

    const expenseType = new ExpenseType('test', 'test', 0, false);
    describe(' When creating new expenseType', () => {
      beforeEach(() => {
        setupTestBed();
        title = 'Create';
        comp.title = title;
      });

      describe('gets response from observable', () => {
        beforeEach(() => {
          spyOn(expenseTypeService, 'createExpenseType')
            .and.returnValue(Observable.of('test'));
        });
        afterEach(() => {
          expect(expenseTypeService.createExpenseType).toHaveBeenCalledWith(expenseType);
          expect(router.navigate).toHaveBeenCalledWith(['/expense-type', undefined]);
        });
        it('will call createExpenseType', () => {
          expenseTypeService.createExpenseType(expenseType);
          comp.onSubmit(expenseType);
        }); // will call createExpenseType
      }); // gets response from observable

      describe('throws an error ', () => {
        const errorStr = 'testError';
        beforeEach(() => {
          spyOn(expenseTypeService, 'createExpenseType')
            .and.returnValue(Observable.throw(errorStr));
          spyOn(errorService, 'announceError');
        });
        afterEach(() => {
          expect(errorService.announceError)
            .toHaveBeenCalledWith({ status: errorStr, type: 'Expense Type' });
        });
        it('announces the error', () => {
          comp.onSubmit(expenseType);
        }); // announces the error
      }); // throws an error
    }); // When creating new expenseType

    describe(' When creating new expenseType', () => {
      beforeEach(() => {
        title = 'Update';
        comp.title = title;
      });

      describe('gets response from observable', () => {
        beforeEach(() => {
          spyOn(expenseTypeService, 'updateExpenseType')
            .and.returnValue(Observable.of('test'));
        });
        afterEach(() => {
          expect(expenseTypeService.updateExpenseType).toHaveBeenCalledWith(expenseType);
          expect(router.navigate).toHaveBeenCalledWith(['/expense-type', undefined]);
        });
        it('will call updateExpenseType', () => {
          expenseTypeService.updateExpenseType(expenseType);
          comp.onSubmit(expenseType);
        }); // will call updateExpenseType
      }); // gets response from observable

      describe('throws an error ', () => {
        const errorStr = 'testError';
        beforeEach(() => {
          spyOn(expenseTypeService, 'updateExpenseType')
            .and.returnValue(Observable.throw(errorStr));
          spyOn(errorService, 'announceError');
        });
        afterEach(() => {
          expect(errorService.announceError)
            .toHaveBeenCalledWith({ status: errorStr, type: 'Expense Type' });
        });
        it('announces the error', () => {
          comp.onSubmit(expenseType);
        }); // announces the error
      }); // throws an error
    }); // When creating new expenseType
  }); // onSubmit

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
        expect(comp.model).toEqual(new ExpenseType('', '', 0, false));
      }); // title is Update
    }); // if params does not have an ID
  }); // ngOnInit
});
