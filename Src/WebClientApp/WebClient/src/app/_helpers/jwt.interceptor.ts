import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
		if (request.url.startsWith(environment.serverApiUrl) && !request.url.endsWith('RefreshToken')) {

			if (!this.authenticationService.isAccessTokenDefined()) {
				// Use switchMap to switch to the new observable returned by refreshTokenPromise
				return from(this.authenticationService.refreshTokenPromise()).pipe(
					switchMap(() => {
						// Add the token to the request after refreshing
						request = this.authenticationService.addAuthHeader(request);
						return next.handle(request);
					})
				);
			}

			// If token is already defined, add the token to the request
			request = this.authenticationService.addAuthHeader(request);
		}

		// Continue with the original request
		return next.handle(request);

    }
}
