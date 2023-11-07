import { Component } from '@angular/core';
import { CommonButtonComponent } from './components/shared/common-button/common-button.component';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from './_services/authentication/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'WebClient';

    showHeader: boolean = true;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {



        router.events.forEach(async (event) => {
            if (event instanceof NavigationStart) {
                if (event['url'] == '/login' ||
                    event['url'] == '/register') {
                    this.showHeader = false;
                } else {
                    this.showHeader = true;

                    // Authentication check
                    if (!this.authenticationService.isAccessTokenDefined()) {
                        await this.authenticationService.refreshTokenPromise();
                    }
                }
            }
        });


    }
}
