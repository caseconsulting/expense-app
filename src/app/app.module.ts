import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { BodyComponent } from './body/body.component';
import { NewExpenseTypeComponent } from './new-expense-type/new-expense-type.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { UpdateDeleteBtnComponent } from './update-delete-btn/update-delete-btn.component';
import { CreateBtnComponent } from './create-btn/create-btn.component';
import { EmployeeFormComponent } from './forms/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    BodyComponent,
    NewExpenseTypeComponent,
    EmployeeComponent,
    EmployeeListComponent,
    UpdateDeleteBtnComponent,
    CreateBtnComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
