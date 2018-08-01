import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';

@Injectable()
export class AuthService {

    @SessionStorage()
    private authToken: string;
    @LocalStorage()
    private persistenceAuthToken: string;

    public redirectUrl: string;

    public logout(): void {
        this.authToken = null;
        this.persistenceAuthToken = null;
    }

    public checkAuthorize(): boolean {
        if (this.authToken != null || this.persistenceAuthToken != null) {
            return true;
        }
        return false;
    }
}
