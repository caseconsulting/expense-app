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
import { ExpenseTypeListComponent } from './expense-type/expense-type-list.component';
import { ExpenseTypePreviewComponent } from './expense-type-preview/expense-type-preview.component';
import { ExpenseTypeFormComponent } from './expense-type-form/expense-type-form.component';
import { ExpenseListComponent } from './expense/expense-list.component';
import { ExpensePreviewComponent } from './expense-preview/expense-preview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';

// Services
import { EmployeeService } from './employee/employee.service';
import { ExpenseTypeService } from './expense-type/expense-type.service';
import { UpdateListService } from './update-list.service';
import { ErrorService } from './error/error.service';
import { ExpenseService } from './expense/expense.service';
import { HelpComponent } from './help/help.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';
import { ExpenseTotalsComponent } from './expense-totals/expense-totals.component';
import { ExpensePreviewTableElementComponent } from './expense-preview-table-element/expense-preview-table-element.component'

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
    ExpenseTypeListComponent,
    ExpenseTypePreviewComponent,
    ExpenseTypeFormComponent,
    ExpenseListComponent,
    ExpensePreviewComponent,
    DashboardComponent,
    ExpenseFormComponent,
    HelpComponent,
    ExpenseCardComponent,
    ExpenseTotalsComponent,
    ExpensePreviewTableElementComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    ExpRoutingModule,
  ],
  providers: [EmployeeService,
    ExpenseTypeService,
    UpdateListService,
    ErrorService,
    ExpenseService,
    AuthService],

  bootstrap: [AppComponent]
})
export class AppModule { }
