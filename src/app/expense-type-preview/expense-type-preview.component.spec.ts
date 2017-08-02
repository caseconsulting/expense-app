import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypePreviewComponent } from './expense-type-preview.component';

describe('ExpenseTypePreviewComponent', () => {
  let component: ExpenseTypePreviewComponent;
  let fixture: ComponentFixture<ExpenseTypePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
