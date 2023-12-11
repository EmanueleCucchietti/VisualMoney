import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    LoginRequestDto,
    LoginResponseDto,
    SignupRequestDto
} from 'src/app/_models';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _accessToken: string | undefined;
    public setEmptyAccessToken() {
        this._accessToken = undefined;
    }
    public set accessToken(value: string) {
        this._accessToken = value;
    }
    public get accessToken(): string | undefined {
        return this._accessToken;
    }

    public isAccessTokenDefined(): boolean {
        return (
            typeof this._accessToken != 'undefined' &&
            this._accessToken != null &&
            this._accessToken.trim() != ''
        );
    }

    constructor(private httpClient: HttpClient) {}

    async refreshTokenPromise() {
        try {
            let response = await lastValueFrom(this.refreshTokenObservable());

            if (response.accessToken) {
                this.accessToken = response.accessToken;
            } else {
                throw new Error(
                    'Error while getting access token from refresh token'
                );
            }
        } catch (error) {
            // need to logout, because refresh token is invalid
            // so we need to clear the access token and redirect to login page
			console.log(error);
            this.logout();
        }
    }

    refreshTokenObservable(): Observable<LoginResponseDto> {
        // return the observable that handles the request
        // but also set the access token if the request is successful
        return this.httpClient
            .post<any>(`${environment.serverApiUrl}/User/RefreshToken`, null, {
                withCredentials: true
            })
            .pipe(
                map((response: LoginResponseDto) => {
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    return response;
                })
            );
    }

    login(loginRequestData: LoginRequestDto): Observable<LoginResponseDto> {
        return this.httpClient
            .post<any>(
                `${environment.serverApiUrl}/User/Login`,
                loginRequestData,
                { withCredentials: true }
            )
            .pipe(
                map((response: LoginResponseDto) => {
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    return response;
                })
            );
    }

    signup(signupRequestDto: SignupRequestDto) : Observable<any> {
		return this.httpClient.post<any>(
			`${environment.serverApiUrl}/User/Register`,
			signupRequestDto,
			{ withCredentials: true }
		);
    }

    isUsernameAvailable(username: string): Observable<boolean> {
        return this.httpClient.get<boolean>(
            `${environment.serverApiUrl}/User/IsUsernameAvailable?username=${username}`
        );
    }

    isEmailAvailable(email: string): Observable<boolean> {
        return this.httpClient.get<boolean>(
            `${environment.serverApiUrl}/User/IsEmailAvailable?email=${email}`
        );
    }

    public canAccessPage(): boolean {
        return this.isAccessTokenDefined();
    }

    logout() {
        this._accessToken = undefined;
        window.location.href = '/login';
    }

    addAuthHeader(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.accessToken}`
            }
        });
    }
}
