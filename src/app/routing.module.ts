import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components that will have routes
import { BodyComponent } from './body/body.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { UpdateDeleteBtnComponent } from './update-delete-btn/update-delete-btn.component';
import { CreateBtnComponent } from './create-btn/create-btn.component';
import { EmployeeFormComponent } from './forms/employee-form/employee-form.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '', component: BodyComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeFormComponent },
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
