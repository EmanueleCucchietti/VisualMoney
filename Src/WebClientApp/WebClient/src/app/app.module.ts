import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { CommonButtonComponent } from './components/shared/common-button/common-button.component';
import { TestComponent } from './views/test/test.component';
import { HeaderComponent } from './shared/header/header.component';

import { FormsModule } from '@angular/forms';
import { Test2Component } from './views/test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommonButtonComponent,
    TestComponent,
    HeaderComponent,
    Test2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
