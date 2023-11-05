
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root', // This registers the guard as a provider in the root module
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService : AuthenticationService) {}

  canActivate(): boolean {
    // const random = Math.floor(Math.random() * 6);

    // if (random > 1) {
    if(true){
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect unauthenticated users to the login page
      return false; // Prevent access to the route
    }
  }
}

