import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { TestComponent } from './views/test/test.component';
import { AuthGuard } from './_guards/auth.guard';
import { SignupComponent } from './views/signup/signup.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { WalletComponent } from './views/wallet/wallet.component';
import { WalletCreateComponent } from './views/wallet/wallet-create/wallet-create.component';
import { WalletStartComponent } from './views/wallet/wallet-start/wallet-start.component';
import { WalletViewComponent } from './views/wallet/wallet-view/wallet-view.component';
import { WalletEditComponent } from './views/wallet/wallet-edit/wallet-edit.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { layout: 'login-layout' }
    },
    {
        path: 'signup',
        component: SignupComponent,
        data: { layout: 'login-layout' }
    },
    {
        path: 'test',
        component: TestComponent,
        canActivate: [AuthGuard],
        data: { layout: 'default-layout' }
    },
    {
        path: 'wallet',
        component: WalletComponent,
        canActivate: [AuthGuard],
        data: { layout: 'default-layout' },
        children: [
			{ path: '', component: WalletStartComponent },
            { path: 'create', component: WalletCreateComponent },
            { path: ':id', component: WalletViewComponent },
			{ path: 'edit/:id', component: WalletEditComponent}
        ]
    },

    // page not found
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { layout: 'default-layout' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
