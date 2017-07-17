import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBtnComponent } from './create-btn.component';

describe('CreateBtnComponent', () => {
  let component: CreateBtnComponent;
  let fixture: ComponentFixture<CreateBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
