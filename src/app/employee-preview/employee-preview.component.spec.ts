import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePreviewComponent } from './employee-preview.component';

describe('EmployeePreviewComponent', () => {
  let component: EmployeePreviewComponent;
  let fixture: ComponentFixture<EmployeePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
