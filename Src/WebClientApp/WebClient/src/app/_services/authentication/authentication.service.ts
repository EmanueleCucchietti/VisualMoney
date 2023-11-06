import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequestDto, LoginResponseDto } from 'src/app/_models';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root',
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
        return typeof this._accessToken != 'undefined' && this._accessToken != null && this._accessToken.trim() != '';
    }

    constructor(private httpClient: HttpClient) { }

    async getAccessTokenFromRefreshToken() {
        try {
            let response: any = await lastValueFrom(
                this.httpClient.post<any>('https://localhost:7232/user/refresh-token', null, {
                    withCredentials: true,
                })
                    .pipe(map((response: LoginResponseDto) => {
                        return response;
                    }))
            );

            if (response.accessToken) {
                this.accessToken = response.accessToken;
            }
            else {
                throw new Error("Error while getting access token from refresh token");
            }
        } catch (error) {
            // need to logout, because refresh token is invalid
            // so we need to clear the access token and redirect to login page
            this.logout();
        }
    }

    login(loginRequestData: LoginRequestDto): Observable<LoginResponseDto> {
        return this.httpClient.post<any>(`${environment.serverApiUrl}/user/login`,
            loginRequestData,
            { withCredentials: true })
            .pipe((map((response: LoginResponseDto) => {
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                return response;
            }
            )));
    }

    public canAccessPage(): boolean {
        return this.isAccessTokenDefined();
    }


    logout() {
        this._accessToken = undefined;
        window.location.href = '/login';
    }
}
