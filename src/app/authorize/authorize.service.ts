import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthorizeService {

  constructor(private http: HttpService) { }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  getLoginRequest(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/User/GetLoginRequest', next, fallback, ModuleType.Admin);
  }

  login(loginRequest, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/Login', loginRequest, next, fallback, ModuleType.Admin);
  }
}
