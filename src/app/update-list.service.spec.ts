// Testing Dependencies
import {fakeAsync, inject, TestBed } from '@angular/core/testing';
// Service Dependencies
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

// Service
import { UpdateListService } from './update-list.service';

describe('UpdateListService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateListService
        // Tell our injector to inject an instance of MockBackend whenever
        // someone asks for an XHRBackend, which is what Angular’s Http module
        // does behind the scenes

      ]
    });
  });

  // Create mockResponse
  describe('when announceUpdate is called', () => {
    let caller, mockResponse, updateListService;
    beforeEach(() => mockResponse = '{string}');
    beforeEach(() => {
      jasmine.createSpyObj(updateListService, ['updateAnnounced$', 'subscribe']);
      updateListService.updateAnnounced$.and.returnValue(updateListService);
      updateListService.subscribe.and.returnValue(jasmine.any(Function));
    });
    // spec
    it('should return an Observable<Subject<string>>', () => {
      // Call to service
      console.log(updateListService.updateAnnounced$);
      expect(caller).toEqual(jasmine.any(String));
    });

  });
});
