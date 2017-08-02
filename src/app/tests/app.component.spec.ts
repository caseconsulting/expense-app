// Angular testing utilities
import { Component } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Component to be tested
import { AppComponent } from '../app.component';

@Component({
  selector: 'exp-body',
  template: ''
})
class BodyComponent { }

@Component({
  selector: 'exp-nav',
  template: ''
})
class NavComponent { }

@Component({
  selector: 'exp-header',
  template: ''
})
class HeaderComponent { }

describe('AppComponent', () => {
  // Declare utilities and component
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, NavComponent, BodyComponent]
    })

    .compileComponents();
  }));

  // Create an instance of body component
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      // look for changes
      fixture.detectChanges();
    });
  // check to see if the component was created
    it('should be created', () => {
      expect(comp).toBeTruthy();
    });
});
