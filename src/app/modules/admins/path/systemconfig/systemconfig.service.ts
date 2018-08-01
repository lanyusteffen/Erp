import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SystemConfigService {
    private systemconfig$ = new Subject<any>();

    constructor(private http: HttpService) { }

    get() { return this.systemconfig$.asObservable(); }

    newOne(next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/SystemConfig/GetForNew', {}, next, fallback, ModuleType.Admin);
    }

    detail(next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/SystemConfig/GetForModify', { }, next, fallback, ModuleType.Webadmin);
    }

    create(user, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/SystemConfig/New', user, next, fallback, ModuleType.Admin);
    }

    update(user, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/SystemConfig/Modify', user, next, fallback, ModuleType.Admin);
    }
}
