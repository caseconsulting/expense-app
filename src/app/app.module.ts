import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { BodyComponent } from './body/body.component';
import { NewExpenseTypeComponent } from './new-expense-type/new-expense-type.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    NavComponent,
    BodyComponent,
    NewExpenseTypeComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
