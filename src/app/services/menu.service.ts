import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from './http.service';
import { SessionStorage, LocalStorage } from 'ngx-webstorage';

@Injectable()
export class MenuService {

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

  initMenusContinuation(continueWith: () => void, fallback: (err: any) => void) {
    this.fetchMenus(data => {
      this.menus = data;
      console.log(this);
      continueWith();
    }, err => {
      if (fallback) {
        fallback(err);
      }
    });
  }

  getMenusCached(next: (data: any) => void, noCached: () => void): any {
    if (!this.menus) {
      console.log(this);
      noCached();
    } else {
      next(this.menus);
    }
  }

  getMenus(next: (data: any) => void, fallback: (err: any) => void): any {
    if (!this.menus) {
      this.fetchMenus(data => {
        this.menus = data;
        next(data);
      }, err => {
        if (fallback) {
          fallback(err);
        }
      });
    } else {
      next(this.menus);
    }
  }
}
