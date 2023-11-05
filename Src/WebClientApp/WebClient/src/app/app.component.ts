import { Component } from '@angular/core';
import { CommonButtonComponent } from './components/shared/common-button/common-button.component';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebClient';

  showHeader : boolean = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {

    // Authentication
    this.authenticationService.getAccessTokenFromRefreshToken();

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHeader = false;
        } else {
          // console.log("NU")
          this.showHeader = true;
        }
      }
    });


  }
}
