import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeFormComponent } from './expense-type-form.component';

describe('ExpenseTypeFormComponent', () => {
  let component: ExpenseTypeFormComponent;
  let fixture: ComponentFixture<ExpenseTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
