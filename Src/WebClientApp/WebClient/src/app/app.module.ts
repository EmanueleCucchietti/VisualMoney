import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonButtonComponent } from './components/shared/common-button/common-button.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';

// views
import { LoginComponent } from './views/login/login.component';
import { TestComponent } from './views/test/test.component';
import { HeaderComponent } from './shared/header/header.component';
import { SignupComponent } from './views/signup/signup.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { WalletComponent } from './views/wallet/wallet.component';
import { WalletListComponent } from './views/wallet/wallet-list/wallet-list.component';
import { WalletCreateComponent } from './views/wallet/wallet-create/wallet-create.component';
import { WalletEditComponent } from './views/wallet/wallet-edit/wallet-edit.component';
import { WalletStartComponent } from './views/wallet/wallet-start/wallet-start.component';
import { AuthenticationService, WalletService } from './_services';
import { TransactionComponent } from './views/transaction/transaction/transaction.component';
import { TransactionListComponent } from './views/transaction/transaction-list/transaction-list.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CommonButtonComponent,
        LoginComponent,
        SignupComponent,
        TestComponent,
        PageNotFoundComponent,
        WalletComponent,
        WalletListComponent,
        WalletCreateComponent,
        WalletEditComponent,
        WalletStartComponent,
        TransactionComponent,
        TransactionListComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthenticationService,
        WalletService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
