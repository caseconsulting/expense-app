// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ExpRoutingModule, routableComponents } from './routing.module';

// 3rd party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopupComponent } from './datepicker/datepicker.component';

// Local Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { BodyComponent } from './body/body.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';
import { EmployeePreviewComponent } from './employee-preview/employee-preview.component';
import { ErrorComponent } from './error/error.component';

// Services
import { EmployeeService} from './employee/employee.service';
import { ExpenseTypeService} from './expense-type/expense-type.service';
import { UpdateListService } from './update-list.service';
import { ErrorService } from './error/error.service';
import { ExpenseTypeListComponent } from './expense-type/expense-type-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    BodyComponent,
    EmployeeListComponent,
    DeleteConfirmComponent,
    EmployeeFormCreateComponent,
    routableComponents,
    EmployeePreviewComponent,
    ErrorComponent,
    NgbdDatepickerPopupComponent,
    ExpenseTypeListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    ExpRoutingModule
  ],
  providers: [EmployeeService, ExpenseTypeService, UpdateListService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
