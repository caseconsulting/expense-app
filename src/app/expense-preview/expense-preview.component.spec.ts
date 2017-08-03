import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePreviewComponent } from './expense-preview.component';

describe('ExpensePreviewComponent', () => {
  let component: ExpensePreviewComponent;
  let fixture: ComponentFixture<ExpensePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
