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
import { EmployeeListComponent } from './employee/employee-list.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';
import { EmployeePreviewComponent } from './employee-preview/employee-preview.component';
import { ErrorComponent } from './error/error.component';

import { EmployeeService} from './employee/employee.service';
import { UpdateListService } from './update-list.service';
import { ErrorService } from './error/error.service';

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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    ExpRoutingModule
  ],
  providers: [EmployeeService, UpdateListService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
