// Testing Dependencies
import {fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Service Dependencies
import {HttpModule, Http, Response, RequestMethod, ResponseType, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// Service
import { Employee, EmployeeService } from '../employee/employee.service';

export class MockError extends Response implements Error {

  name: any;
  message: any;

  constructor(status: number, body: string = '') {
    super(new ResponseOptions({ status, body }));
  }
}
fdescribe('EmployeeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [EmployeeService,
        // Tell our injector to inject an instance of MockBackend whenever
        // someone asks for an XHRBackend, which is what Angular’s Http module
        // does behind the scenes
        { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  // Create mockResponse
  describe('getEmployees', () => {
    let thing1, thing2, mockResponse;
    beforeEach(() => {
      thing1 = {
        'id': '5a7e',
        'firstName': 'Dwight',
        'middleName': 'D',
        'lastName': 'Eisenhower',
        'empId': '21',
        'hireDate': ' 3/23/12'
      }
      thing2 = {
        'id': '8d28',
        'firstName': 'Franklin',
        'middleName': 'Delano',
        'lastName': 'Roosevelt',
        'empId': '20',
        'hireDate': ' 2/13/95'
      }
      mockResponse = [thing1, thing2];
    });

    // spec
    it('should return an Observable<Array<Employee>>',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection) => {
          // Here we want to fake the http response.
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // Call to service
        employeeService.getEmployees()
          .subscribe(employees => {
            expect(employees.length).toBe(2);
            expect(employees[0].firstName).toEqual('Dwight');
            expect(employees[1].firstName).toEqual('Franklin');
          });
      })); // should return an Observable<Array<Employee>>

    it('should call handleError',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockError(ourError);

        });
        spyOn(employeeService, 'handleError').and.returnValue('test');
        // Call to service
        employeeService.getEmployees()
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(employeeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', employeeService.handleError);

          });
      })); // should call handleError

  }); // getEmployees

  describe('readSingleEmployee', () => {
    let mockResponse;
    beforeEach(() => {
      mockResponse = {
        'id': '5a7e',
        'firstName': 'Dwight',
        'middleName': 'D',
        'lastName': 'Eisenhower',
        'empId': '21',
        'hireDate': ' 3/23/12'
      };
    });

    // spec
    it('should return an Observable<Employee>',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection) => {
          // Here we want to fake the http response.
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // Call to service
        employeeService.readSingleEmployee()
          .subscribe(employee => {
            expect(employee.firstName).toEqual('Dwight');
          });
      })); // should return an Observable<Employee>
    it('should call handleError',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockError(ourError);

        });
        spyOn(employeeService, 'handleError').and.returnValue('test');
        // Call to service
        employeeService.readSingleEmployee(mockResponse.id)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(employeeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', employeeService.handleError);

          });
      })); // should call handleError
  }); // readSingleEmployee

  describe('createEmployee', () => {
    let mockInput;
    beforeEach(() => {
      mockInput = new Employee('', 'Dwight', 'D', 'Eisenhower', '21', ' 3/23/12');

    });

    // spec
    it('should return an Observable<Employee> ',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

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
        employeeService.createEmployee(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();

          });
      })); // should return a success status

    it('should call handleError',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockError(ourError);

        });
        spyOn(employeeService, 'handleError').and.returnValue('test');
        // Call to service
        employeeService.createEmployee(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(employeeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect');

          });
      })); // should call handleError
  }); // createEmployee

  describe('updateEmployee', () => {
    let mockInput;
    beforeEach(() => {
      mockInput = new Employee('123', 'Dwight', 'D', 'Eisenhower', '21', ' 3/23/12');
    });

    // spec
    it('should return an Observable<Employee> ',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

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
        employeeService.updateEmployee(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
          });
      })); // should return a success status
    it('should call handleError',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Put);
          connection.mockError(ourError);

        });
        spyOn(employeeService, 'handleError').and.returnValue('test');
        // Call to service
        employeeService.updateEmployee(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(employeeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', employeeService.handleError);

          });
      })); // should call handleError
  }); // updateEmployee

  describe('deleteEmployee', () => {
    let mockInput;
    beforeEach(() => {
      mockInput = new Employee('123', 'Dwight', 'D', 'Eisenhower', '21', ' 3/23/12');
    });

    // spec
    it('should return an Observable<Employee> ',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

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
        employeeService.deleteEmployee(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();

          });
      })); // should return a success status
    it('should call handleError',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {
        const ourError = new MockError(404, 'test');
        // This is called every time someone subscribes to
        // an http call.
        mockBackend.connections.subscribe((connection: MockConnection) => {
          // Here we want to fake the http response.
          expect(connection.request.method).toBe(RequestMethod.Delete);
          connection.mockError(ourError);

        });
        spyOn(employeeService, 'handleError').and.returnValue('test');
        // Call to service
        employeeService.deleteEmployee(mockInput)
          .subscribe(response => {
            expect(response).toBeDefined();
            expect(employeeService.handleError).toHaveBeenCalledWith(ourError, jasmine.any(Object));
            console.log('after expect**', employeeService.handleError);

          });
      })); // should call handleError
  }); // updateEmployee

  describe('handleError', () => {
    let error;

    beforeEach(() => {
      error = new Response(new ResponseOptions({
        status: 409,
        url: 'example.com'
      }));
    });

    it('should return an throw an Observable error',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {
        employeeService.handleError(error)
          .subscribe(response => () => {
            fail('expected error');
          },
          (errors) => {
            expect(errors).toBe(409);
          });
      })); // should return an throw an Observable error
  }); // handleError
});
