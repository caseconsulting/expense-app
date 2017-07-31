import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components that will have routes
import { BodyComponent } from './body/body.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';
import { EmployeePreviewComponent } from './employee-preview/employee-preview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '', component: BodyComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/:id', component: EmployeePreviewComponent },
  { path: 'employee/update/:id', component: EmployeeFormCreateComponent },
  { path: 'create', component: EmployeeFormCreateComponent },
  // { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ExpRoutingModule { }

export const routableComponents = [
  // list of components that will have routes
  EmployeeListComponent,
  EmployeeFormCreateComponent,
  BodyComponent
];
