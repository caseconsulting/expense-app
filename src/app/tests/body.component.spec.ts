// default test that's generated from Angular CLI
import { Component } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'exp-employee-list',
  template: ''
})
class EmployeeListComponent { }

@Component({
  selector: 'exp-error',
  template: ''
})
class ErrorComponent { }

@Component({
  selector: 'exp-create-btn',
  template: ''
})
class CreateBtnComponent { }

@Component({
  selector: 'router-outlet',
  template: ''
})
class RouterOutletComponent { }

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

// Declare all components being called within this component
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyComponent, EmployeeListComponent, ErrorComponent, CreateBtnComponent, RouterOutletComponent ]
    })
    // compile components
    .compileComponents();
  }));

// Create an instance of body component
  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    // look for changes
    fixture.detectChanges();
  });
// check to see if the component was created
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
