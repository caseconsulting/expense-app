import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components that will have routes
import { BodyComponent } from './body/body.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';
import { EmployeePreviewComponent } from './employee-preview/employee-preview.component';
import { ExpenseTypeListComponent } from './expense-type/expense-type-list.component';
import { ExpenseTypePreviewComponent } from './expense-type-preview/expense-type-preview.component';
import { ExpenseTypeFormComponent } from './expense-type-form/expense-type-form.component';
import { ExpenseListComponent } from './expense/expense-list.component';
import { ExpensePreviewComponent } from './expense-preview/expense-preview.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '', component: BodyComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'expenses', component: ExpenseListComponent, children: [
      { path: 'create', component: ExpenseFormComponent },
      { path: ':id', component: ExpensePreviewComponent },
      { path: ':id/update', component: ExpenseFormComponent },
    ]
  },
  {
    path: 'expense-types', component: ExpenseTypeListComponent, children: [
      { path: 'create', component: ExpenseTypeFormComponent },
      { path: ':id', component: ExpenseTypePreviewComponent },
      { path: ':id/update', component: ExpenseTypeFormComponent },
    ]
  },
  {
    path: 'employees', component: EmployeeListComponent, children: [
      { path: 'create', component: EmployeeFormCreateComponent },
      { path: ':id', component: EmployeePreviewComponent },
      { path: ':id/update', component: EmployeeFormCreateComponent },
    ]
  },
  { path: 'help', component: HelpComponent }
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
  BodyComponent,
  ExpenseTypeListComponent,
  ExpenseTypePreviewComponent,
  ExpenseListComponent,
  ExpensePreviewComponent
];
