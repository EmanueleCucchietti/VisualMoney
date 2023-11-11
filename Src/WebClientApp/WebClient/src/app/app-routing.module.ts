import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { TestComponent } from './views/test/test.component';
import { AuthGuard } from './_guards/auth.guard';
import { SignupComponent } from './views/signup/signup.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, data: { layout: 'login-layout' } },
  { path: "signup", component: SignupComponent, data: { layout: 'login-layout' } },
  { path: "test", component:  TestComponent, canActivate: [AuthGuard], data: { layout: 'default-layout' } },

  // page not found
  { path: '**', component: PageNotFoundComponent, data: { layout: 'default-layout' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
