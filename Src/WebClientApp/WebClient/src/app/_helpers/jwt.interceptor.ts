import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const isLoggedIn = this.authenticationService.isAccessTokenDefined();
        const isApiUrl = request.url.startsWith(environment.serverApiUrl);
        if (isLoggedIn && isApiUrl) {
            request = this.authenticationService.addAuthHeader(request);
        }

        return next.handle(request);
    }
}
