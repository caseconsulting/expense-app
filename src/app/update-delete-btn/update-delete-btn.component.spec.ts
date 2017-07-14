import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteBtnComponent } from './update-delete-btn.component';

describe('UpdateDeleteBtnComponent', () => {
  let component: UpdateDeleteBtnComponent;
  let fixture: ComponentFixture<UpdateDeleteBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeleteBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
