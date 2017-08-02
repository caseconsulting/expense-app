import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdDatepickerPopupComponent } from '../datepicker/datepicker.component';

describe('NgbdDatepickerPopupComponent', () => {
  let component: NgbdDatepickerPopupComponent;
  let fixture: ComponentFixture<NgbdDatepickerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdDatepickerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdDatepickerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
