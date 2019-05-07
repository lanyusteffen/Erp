import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from './http.service';
import { SessionStorage } from 'ngx-webstorage';

@Injectable()
export class MenuService {

  @SessionStorage()
  private menus: any = null;

  constructor(private http: HttpService) {}

  private fetchMenus(next: (data: any) => void, fallback: (error: any) => void) {
    this.http.post('/Menu/GetMenuList', {}, next, fallback, ModuleType.Admin);
  }

  initMenus(fallback: (error: any) => void) {
    this.fetchMenus(data => {
      this.menus = data;
    }, err => {
      if (fallback) {
        fallback(err);
      }
    });
  }

  initMenusContinuation(continueWith: () => void, fallback: (error: any) => void) {
    this.fetchMenus(data => {
      this.menus = data;
      continueWith();
    }, err => {
      if (fallback) {
        fallback(err);
      }
    });
  }

  getMenus(next: (data: any) => void): any {
    if (!this.menus) {
      this.fetchMenus(data => {
        this.menus = data;
        next(data);
      }, err => {
      });
    } else {
      return next(this.menus);
    }
  }
}
