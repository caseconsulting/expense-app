// Testing Dependencies
import {fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Service Dependencies
import {HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// Service
import { EmployeeService } from '../../employee/employee.service';

describe('EmployeeService', () => {

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
    })

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
      }));
  });
});
