import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, async, inject, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// dummy component with router-outlet
@Component({
  template: `
    <router-outlet></router-outlet>
  `
})

class RoutingComponent { }

// dummy components to be output
@Component({
  template: ''
})
class BodyComponent { }

@Component({
  template: ''
})
class EmployeeListComponent { }

@Component({
  template: ''
})
class EmployeePreviewComponent { }

@Component({
  template: ''
})
class EmployeeFormCreateComponent { }

// Tests for router
fdescribe('component: RoutingComponent', () => {
  let location, router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: '', pathMatch: 'full', redirectTo: '' },
        { path: '', component: BodyComponent },
        { path: 'employees', component: EmployeeListComponent },
        { path: 'employee/:id', component: EmployeePreviewComponent },
        { path: 'employee/update/:id', component: EmployeeFormCreateComponent },
        { path: 'create', component: EmployeeFormCreateComponent },
      ])],
      declarations: [RoutingComponent, BodyComponent, EmployeeListComponent, EmployeePreviewComponent, EmployeeFormCreateComponent]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it('should go home', async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/');
      console.log('after expect');
    });
  }));

  it('should go to employees', async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    router.navigate(['/employees']).then(() => {
      expect(location.path()).toBe('/employees');
      console.log('after expect');
    });
  }));


});
