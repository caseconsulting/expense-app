// default test that's generated from Angular CLI
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from '../../body/body.component';
import { EmployeeListComponent } from '../../employee/employee-list.component'

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyComponent, EmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
