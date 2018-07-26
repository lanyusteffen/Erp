import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from './http.service';

@Injectable()
export class AppService {
  constructor(private http: HttpService) { }

  getSystemConfig(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/SystemConfig/GetForModify', { CompanyId: 1 }, next, fallback, ModuleType.Webadmin);
  }
}
