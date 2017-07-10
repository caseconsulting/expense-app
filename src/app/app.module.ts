import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
=======
import { BodyComponent } from './body/body.component';
import { NewExpenseTypeComponent } from './new-expense-type/new-expense-type.component';
>>>>>>> making-the-front-end: added inputs made output to console

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HeaderComponent,
    NavComponent
=======
    BodyComponent,
    NewExpenseTypeComponent
>>>>>>> making-the-front-end: added inputs made output to console
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
