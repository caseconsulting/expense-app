import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePreviewTableElementComponent } from './expense-preview-table-element.component';

describe('ExpensePreviewTableElementComponent', () => {
  let component: ExpensePreviewTableElementComponent;
  let fixture: ComponentFixture<ExpensePreviewTableElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePreviewTableElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePreviewTableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
