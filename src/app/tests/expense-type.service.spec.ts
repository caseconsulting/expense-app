// Testing Dependencies
import {fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Service Dependencies
import {HttpModule, Http, Response, RequestMethod, ResponseType, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// Service
import { ExpenseType, ExpenseTypeService } from '../expense-type/expense-type.service';

export class MockError extends Response implements Error {

  name: any;
  message: any;

  constructor(status: number, body: string = '') {
    super(new ResponseOptions({ status, body }));
  }
}
describe('ExpenseTypeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ExpenseTypeService,
        // Tell our injector to inject an instance of MockBackend whenever
        // someone asks for an XHRBackend, which is what Angular’s Http module
        // does behind the scenes
        { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  // Create mockResponse
  describe('getExpenseTypes', () => {
    let thing1, thing2, mockResponse;
    beforeEach(() => {
      thing1 = {
        'id': '5a7e',
        'name': 'Tech',
        'budget': '2000',
        'odFlag': 'false'
      }
      thing2 = {
        'id': '8d28',
        'name': 'Training',
        'budget': '3500',
        'odFlag': 'true'
      }
      mockResponse = [thing1, thing2];
    });

    // spec
    it('should return an Observable<Array<ExpenseType>>',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection) => {
          // Here we want to fake the http response.
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // Call to service
        expenseTypeService.getExpenseTypes()
          .subscribe(expenseTypes => {
            expect(expenseTypes.length).toBe(2);
            expect(expenseTypes[0].name).toEqual('Tech');
            expect(expenseTypes[1].name).toEqual('Training');
          });
      })); // should return an Observable<Array<ExpenseType>>

    it('should call handleError',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockError(ourError);

        });
        spyOn(expenseTypeService, 'handleError').and.returnValue('test');
        // Call to service
        expenseTypeService.getExpenseTypes()
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(expenseTypeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', expenseTypeService.handleError);

          });
      })); // should call handleError

  }); // getExpenseTypes

  describe('readSingleExpenseType', () => {
    let mockResponse;
    beforeEach(() => {
      mockResponse = {
        'id': '5a7e',
        'name': 'Tech',
        'budget': '2000',
        'odFlag': 'false'
      };
    });

    // spec
    it('should return an Observable<ExpenseType>',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection) => {
          // Here we want to fake the http response.
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // Call to service
        expenseTypeService.readSingleExpenseType()
          .subscribe(expenseType => {
            expect(expenseType.name).toEqual('Tech');
          });
      })); // should return an Observable<ExpenseType>
    it('should call handleError',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockError(ourError);

        });
        spyOn(expenseTypeService, 'handleError').and.returnValue('test');
        // Call to service
        expenseTypeService.readSingleExpenseType(mockResponse.id)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(expenseTypeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', expenseTypeService.handleError);

          });
      })); // should call handleError
  }); // readSingleExpenseType

  describe('createExpenseType', () => {
    let mockInput;
    beforeEach(() => {
      mockInput = new ExpenseType('', 'Tech', 2000, false);

    });

    // spec
    it('should return an Observable<ExpenseType> ',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockInput),
            status: 200
          })));

        });

        // Call to service
        expenseTypeService.createExpenseType(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();

          });
      })); // should return a success status

    it('should call handleError',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockError(ourError);

        });
        spyOn(expenseTypeService, 'handleError').and.returnValue('test');
        // Call to service
        expenseTypeService.createExpenseType(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(expenseTypeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect');

          });
      })); // should call handleError
  }); // createExpenseType

  describe('updateExpenseType', () => {
    let mockInput;
    beforeEach(() => {
      mockInput = new ExpenseType('', 'Tech', 2000, false);
    });

    // spec
    it('should return an Observable<ExpenseType> ',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Put);
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockInput),
            status: 200
          })));
        });

        // Call to service
        expenseTypeService.updateExpenseType(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
          });
      })); // should return a success status
    it('should call handleError',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Put);
          connection.mockError(ourError);

        });
        spyOn(expenseTypeService, 'handleError').and.returnValue('test');
        // Call to service
        expenseTypeService.updateExpenseType(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(expenseTypeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', expenseTypeService.handleError);

          });
      })); // should call handleError
  }); // updateExpenseType

  describe('deleteExpenseType', () => {
    let mockInput;
    beforeEach(() => {
      mockInput = new ExpenseType('', 'Tech', 2000, false);
    });

    // spec
    it('should return an Observable<ExpenseType> ',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Delete);
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockInput),
            status: 200
          })));
        });

        // Call to service
        expenseTypeService.deleteExpenseType(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();

          });
      })); // should return a success status
    it('should call handleError',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Delete);
          connection.mockError(ourError);

        });
        spyOn(expenseTypeService, 'handleError').and.returnValue('test');
        // Call to service
        expenseTypeService.deleteExpenseType(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(expenseTypeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', expenseTypeService.handleError);

          });
      })); // should call handleError
  }); // updateExpenseType

  describe('handleError', () => {
    let error;

    beforeEach(() => {
      error = new Response(new ResponseOptions({
        status: 409,
        url: 'example.com'
      }));
    });

    it('should return an throw an Observable error',
      inject([ExpenseTypeService, XHRBackend], (expenseTypeService, mockBackend) => {
        expenseTypeService.handleError(error)
          .subscribe(response => () => {
            fail('expected error');
          },
          (errors) => {
            expect(errors).toBe(409);
          });
      })); // should return an throw an Observable error
  }); // handleError
});
