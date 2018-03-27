import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getSystemConfig() {
    return this.http.get('/SystemConfig/GetForModify');
  }
}
