import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTotalsComponent } from './expense-totals.component';

describe('ExpenseTotalsComponent', () => {
  let component: ExpenseTotalsComponent;
  let fixture: ComponentFixture<ExpenseTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
