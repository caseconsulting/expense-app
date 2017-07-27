// Testing Dependencies
import { By } from '@angular/platform-browser';
import {fakeAsync, inject, TestBed, async } from '@angular/core/testing';
// Service Dependencies
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

// Service
import { UpdateListService } from '../../update-list.service';

describe('UpdateListService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateListService]
    });
  });

  describe('announceUpdate', () => {
    it('should update announced source with the caller', inject([UpdateListService], (updateListService) => {

      // turn updateAnnounced Obsservable to a promise and expect the result to
      // be the string that was announced
      updateListService.updateAnnounced$
      .subscribe( caller => {
        expect(caller).toContain('test');
      });
      updateListService.announceUpdate('test');
    })); // should update announced source with the caller
  }); // announceUpdate

}); // end tests
