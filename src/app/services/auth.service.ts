import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { LocalStorage, SessionStorage } from 'ngx-webstorage';

@Injectable()
export class AuthService {

    @SessionStorage()
    accessToken: string;
    @SessionStorage()
    refreshToken: string;
    @LocalStorage()
    accessPersistenceToken: string;
    @LocalStorage()
    refreshPersistenceToken: string;
    @LocalStorage()
    isRememberMe: boolean;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    logout(): void {
        this.refreshToken = null;
        this.accessToken = null;
        this.accessPersistenceToken = null;
        this.refreshPersistenceToken = null;
    }

    checkAuthorize(): boolean {
        if (this.isRememberMe && this.checkPersistenceAuthToken()) {
            return true;
        } else if (!this.isRememberMe && this.checkAuthToken()) {
            return true;
        }

        return false;
    }

    protected checkPersistenceAuthToken(): boolean {

        const accessTokenAvailable: boolean = (this.accessPersistenceToken
            && this.accessPersistenceToken !== '');

        const refreshTokenAvailable: boolean = (this.refreshPersistenceToken
            && this.refreshPersistenceToken !== '');

        if (accessTokenAvailable && refreshTokenAvailable) {
            return true;
        }

        return false;
    }

    protected checkAuthToken(): boolean {

        const accessTokenAvailable: boolean = (this.accessToken
            && this.accessToken !== '');

        const refreshTokenAvailable: boolean = (this.refreshToken
            && this.refreshToken !== '');

        if (accessTokenAvailable && refreshTokenAvailable) {
            return true;
        }

        return false;
    }
}
