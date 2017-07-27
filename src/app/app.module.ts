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
import { CreateBtnComponent } from './create-btn/create-btn.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';

import { EmployeeService} from './employee/employee.service';
import { UpdateListService } from './update-list.service';
import { EmployeePreviewComponent } from './employee-preview/employee-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    BodyComponent,
    EmployeeListComponent,
    CreateBtnComponent,
    DeleteConfirmComponent,
    EmployeeFormCreateComponent,
    routableComponents,
    EmployeePreviewComponent
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
