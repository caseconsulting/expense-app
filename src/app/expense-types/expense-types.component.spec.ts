import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypesComponent } from './expense-types.component';

describe('ExpenseTypesComponent', () => {
  let component: ExpenseTypesComponent;
  let fixture: ComponentFixture<ExpenseTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
