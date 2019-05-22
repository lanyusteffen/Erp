import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from './http.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(private http: HttpService,
              private localStorageService: LocalStorageService) {}

  private fetchMenus(next: (data: any) => void, fallback: (error: any) => void) {
    this.http.post('/Menu/GetMenuList', {}, next, fallback, ModuleType.Admin);
  }

  initMenus(fallback: (error: any) => void) {
    this.fetchMenus(data => {
      this.localStorageService.store('menus', data);
    }, err => {
      if (fallback) {
        fallback(err);
      }
    });
  }

  initMenusContinuation(continueWith: () => void, fallback: (err: any) => void) {
    this.fetchMenus(data => {
      this.localStorageService.store('menus', data);
      continueWith();
    }, err => {
      if (fallback) {
        fallback(err);
      }
    });
  }

  getMenusCached(next: (data: any) => void, noCached: () => void): any {
    const menus = this.localStorageService.retrieve('menus');
    if (!menus) {
      noCached();
    } else {
      next(menus);
    }
  }

  getMenus(next: (data: any) => void, fallback: (err: any) => void): any {
    const menus = this.localStorageService.retrieve('menus');
    if (!menus) {
      this.fetchMenus(data => {
        this.localStorageService.store('menus', data);
        next(data);
      }, err => {
        if (fallback) {
          fallback(err);
        }
      });
    } else {
      next(menus);
    }
  }
}
