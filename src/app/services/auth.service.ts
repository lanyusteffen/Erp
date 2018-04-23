import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';

@Injectable()
export class AuthService {

    @SessionStorage()
    private authToken: String;
    @LocalStorage()
    private persistenceAuthToken: String;

    public redirectUrl: String;

    logout(): void {
        this.authToken = null;
        this.persistenceAuthToken = null;
    }

    checkAuthorize(): boolean {
        if (this.authToken !== '' || this.persistenceAuthToken !== '') {
            return true;
        }
        return false;
    }
}
