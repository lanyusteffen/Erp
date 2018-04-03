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
    let removeIndex = 0;
    for (let i = 0; i < this.tabs.length; i++) {
      const item = this.tabs[i];
      if (item.id === tab.id) {
        this.tabs.splice(i, 1);
        removeIndex = i;
        break;
      }
    }
    this.tabs$.next(this.tabs);
    // while (this.tabs.length <= removeIndex) {
    //   --removeIndex;
    // }
  }

  clear() {
    this.id = 1;
    for (let i = 0; i < this.tabs.length; i++) {
      if (i == 0) {
        continue;
      }
      this.tabs.splice(i, 1);
    }
    this.tabs$.next(this.tabs);
  }
}
