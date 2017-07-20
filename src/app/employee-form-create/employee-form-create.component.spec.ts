import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormCreateComponent } from './employee-form-create.component';

describe('EmployeeFormCreateComponent', () => {
  let component: EmployeeFormCreateComponent;
  let fixture: ComponentFixture<EmployeeFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
