import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _accessToken: string = '';
    public set accessToken(value: string) {
        this._accessToken = value;
    }
    public get accessToken(): string {
        return this._accessToken;
    }

    public isAccessTokenDefined(): boolean {
        return typeof this._accessToken != 'undefined' && this._accessToken != null;
    }

    constructor() { }

    async getAccessTokenFromRefreshToken() {
        try {
            let request = await axios('https://localhost:7232/user/refresh-token', {
                method: 'POST',
                withCredentials: true,
            });

            if (
                request.status == 200 &&
                request.data != null &&
                request.data != undefined &&
                request.data.accessToken != null
            ) {
                this.accessToken = request.data.accessToken;
            }
        } catch (error) {
            alert(error);
        }
    }

    async login(username: string, password: string): Promise<any> {
        var request = await axios.post('https://localhost:7232/user/login', {
            EmailOrUsername: username,
            Password: password,
        }, {
            withCredentials: true,
        });

        if (request.status == 200 &&
            request.data != null &&
            request.data != undefined &&
            request.data.accessToken != null
        ) {
            this.accessToken = request.data.accessToken;
        }

        return request.data;
    }

    public canAccessPage(): boolean {
        return this.isAccessTokenDefined();
    }
}
