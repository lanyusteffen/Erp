import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { NavItem } from '@contracts/nav.item';

@Injectable()
export class NavService {
  private navs$ = new Subject<any>();
  private navs: NavItem[] = [];

  constructor(private router: Router) { }

  all() {
    return this.navs;
  }

  get(): Observable<NavItem[]> {
    return this.navs$.asObservable();
  }

  create(nav: NavItem) {
    let isExistedNav = false;
    this.navs.forEach(v => {
      if (v.Name === nav.Name && v.Code === nav.Code) {
        isExistedNav = true;
        return;
      }
    });
    if (isExistedNav) {
      return;
    }
    this.navs.push({
      ...nav
    });
    this.navs$.next(this.navs);
  }

  remove(nav: NavItem) {
    let removeIndex = 0;
    for (let i = 0; i < this.navs.length; i++) {
      const item = this.navs[i];
      if (item.Name === nav.Name && item.Code === nav.Code) {
        this.navs.splice(i, 1);
        removeIndex = i;
        break;
      }
    }
    while (this.navs.length <= removeIndex) {
      --removeIndex;
    }
    this.navs$.next(this.navs);
  }

  clear() {
    for (let i = 0; i < this.navs.length; i++) {
      if (i === 0) {
        continue;
      }
      this.navs.splice(i, 1);
      --i;
    }
    this.navs$.next(this.navs);
  }
}
