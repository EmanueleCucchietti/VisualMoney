import { Injectable, Injector } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subject, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthenticationService } from "../_services";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    // private authenticationService: AuthenticationService | undefined;

    refreshTokenInProgress = false;

    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector, private router: Router, private authenticationService : AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // this.authenticationService = this.injector.get(AuthenticationService);

        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // this.authenticationService.logout();

                return this.HandleAuthenticationError(request, next);
            }

            const error = err.error.message || err.statusText;
            return throwError(() => error);
        }))
    }

    refreshToken(): Observable<any>{
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.refreshTokenInProgress = true;

            return this.authenticationService.refreshTokenObservable().pipe(
                tap(() => {
                    this.refreshTokenInProgress = false;
                    this.tokenRefreshedSource.next(null);
                }),
                catchError((err) => {
                    this.refreshTokenInProgress = false;
                    this.authenticationService.logout();

                    return throwError(() => err);
                }));
        }
    }

    HandleAuthenticationError(request : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return this.refreshToken()!.pipe(
            switchMap(() => {
                request = this.authenticationService!.addAuthHeader(request);
                return next.handle(request);
            }),
            catchError(e => {
                this.authenticationService!.logout();
                return throwError(() => e);
            }));
    }

}
