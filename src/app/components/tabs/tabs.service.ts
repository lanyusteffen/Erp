import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface Tab {
  id: number;
  name: string;
  link: string;
  outlet: string;
}

const homeTab = {
  id: 1,
  name: '首页',
  link: '/home',
  outlet: 'home'
};

@Injectable()
export class TabsService {
  private tabs$ = new Subject<any>();
  id = 1;
  tabs: Tab[] = [homeTab];

  all() {
    return this.tabs;
  }

  get(): Observable<Tab[]> {
    return this.tabs$.asObservable();
  }

  create(tab) {
    let isExistedTab = false;
    this.tabs.forEach(v => {
      if (v.link === tab.link) {
        isExistedTab = true;
        return;
      }
    });
    if (isExistedTab) {
      return;
    }
    this.tabs.push({
      id: ++this.id,
      ...tab
    });
    this.tabs$.next(this.tabs);
  }

  remove(tab: Tab) {
    this.tabs = this.tabs.filter(item => item.id !== tab.id);
    this.tabs$.next(this.tabs);
  }

  clear() {
    this.id = 1;
    this.tabs = [homeTab];
    this.tabs$.next(this.tabs);
  }
}
