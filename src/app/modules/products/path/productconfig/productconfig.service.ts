import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProductConfigService {
    private productconfig$ = new Subject<any>();

    constructor(private http: HttpService) { }

    get() { return this.productconfig$.asObservable(); }

    newOne(next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/ProductConfig/GetForNew', {}, data => {
            next(data);
            this.productconfig$.next(data);
        }, fallback, ModuleType.Product);
    }

    detail(next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/ProductConfig/GetForModify', {}, data => {
            next(data);
            this.productconfig$.next(data);
        }, fallback, ModuleType.Product);
    }

    create(user, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/ProductConfig/New', user, next, fallback, ModuleType.Product);
    }

    update(user, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/ProductConfig/Modify', user, next, fallback, ModuleType.Product);
    }
}
