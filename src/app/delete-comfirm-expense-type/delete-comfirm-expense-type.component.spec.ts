import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComfirmExpenseTypeComponent } from './delete-comfirm-expense-type.component';

describe('DeleteComfirmExpenseTypeComponent', () => {
  let component: DeleteComfirmExpenseTypeComponent;
  let fixture: ComponentFixture<DeleteComfirmExpenseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComfirmExpenseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComfirmExpenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
