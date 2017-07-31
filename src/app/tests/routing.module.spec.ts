import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, async, inject, TestBed, getTestBed, ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
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
xdescribe('component: RoutingComponent', () => {
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
      declarations: [RoutingComponent, BodyComponent, EmployeeListComponent, EmployeePreviewComponent, EmployeeFormCreateComponent],
      providers: [
      // provide a better mock
      {
        provide: ActivatedRoute, useValue: {
          params: Observable.of({'id': 123})
        }
      }]
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
    router.navigate(['employees']).then(() => {
      expect(location.path()).toBe('/employees');
      console.log('after expect');
    });
  }));

  it('should go to employees', fakeAsync(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    router.params.subscribe( () => {})

    router.navigate(['employees', 234]).then(() => {
      expect(location.path()).toBe('/employees/234');
      console.log('after expect');
    });
  }));


});
