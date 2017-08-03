import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmExpenseComponent } from './delete-confirm-expense.component';

describe('DeleteConfirmExpenseComponent', () => {
  let component: DeleteConfirmExpenseComponent;
  let fixture: ComponentFixture<DeleteConfirmExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
