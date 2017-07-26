import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpRoutingModule, routableComponents } from './routing.module';

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
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';

import { EmployeeService} from './employee/employee.service';
import { UpdateListService } from './update-list.service';

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
    EmployeeFormComponent,
    DeleteConfirmComponent,
    EmployeeFormCreateComponent,
    routableComponents
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    ExpRoutingModule
  ],
  providers: [EmployeeService, UpdateListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
