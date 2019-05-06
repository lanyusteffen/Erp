import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from './http.service';

@Injectable()
export class MenuService {
  constructor(private http: HttpService) {}

  getAll(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/GetMenuList', {
    }, next, fallback, ModuleType.Admin);
  }
}
