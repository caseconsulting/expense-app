// Angular testing utilities
import { Component } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Component to be tested
import { NavComponent } from '../nav/nav.component';

// dummy component
@Component({
  selector: 'exp-body',
  template: ''
})
class BodyComponent { }

describe('NavComponent', () => {
  // Declare utilities and component
  let comp: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent]
    })

    .compileComponents();
  }));

  // Create an instance of body component
    beforeEach(() => {
      fixture = TestBed.createComponent(NavComponent);
      comp = fixture.componentInstance;
      // look for changes
      fixture.detectChanges();
    });
  // check to see if the component was created
    it('should be created', () => {
      expect(comp).toBeTruthy();
    });
});
