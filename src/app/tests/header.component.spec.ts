// Angular testing utilities
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Component to be tested
import { HeaderComponent } from '../header/header.component';

describe('HeaderComponent (inline template)', () => {
  // Declare utilities and component
  let comp: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent], // declare the test component
    });

    // creates an instance of HeaderComponent and returns a component test fixture.
    fixture = TestBed.createComponent(HeaderComponent);
    // closes the current TestBed instance to further configuration. You cannot call any more TestBed configuration methods
    // The fixture provides access to the component instance itself and to the
    // DebugElement, which is a handle on the component's DOM element
    comp = fixture.componentInstance; // HeaderComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display the title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });
});
