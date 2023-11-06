import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { CommonButtonComponent } from './components/shared/common-button/common-button.component';
import { TestComponent } from './views/test/test.component';
import { HeaderComponent } from './shared/header/header.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommonButtonComponent,
    TestComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
