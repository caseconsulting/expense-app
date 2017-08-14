import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCardComponent } from './expense-card.component';

describe('ExpenseCardComponent', () => {
  let component: ExpenseCardComponent;
  let fixture: ComponentFixture<ExpenseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
