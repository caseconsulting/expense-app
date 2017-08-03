import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFormsComponent } from './expense-forms.component';

describe('ExpenseFormsComponent', () => {
  let component: ExpenseFormsComponent;
  let fixture: ComponentFixture<ExpenseFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
