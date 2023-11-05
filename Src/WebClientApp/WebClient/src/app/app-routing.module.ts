import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { TestComponent } from './views/test/test.component';
import { AuthGuard } from './guards/auth.guard';
import { Test2Component } from './views/test2/test2.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, data: { layout: 'login-layout' } },
  { path: "test", component:  TestComponent, canActivate: [AuthGuard], data: { layout: 'default-layout' } },
  { path: "test2", component:  Test2Component, canActivate: [AuthGuard], data: { layout: 'default-layout' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
