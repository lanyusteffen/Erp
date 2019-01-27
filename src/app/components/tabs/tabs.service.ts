import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Tab } from '@contracts/tab';

const homeTab: Tab = {
  id: 1,
  name: '首页',
  link: '/home/index'
};

@Injectable()
export class TabsService {
  private tabs$ = new Subject<any>();
  private id = 1;
  private tabs: Tab[] = [homeTab];

  constructor() { }

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
    while (this.tabs.length <= removeIndex) {
      --removeIndex;
    }
    this.tabs$.next(this.tabs);
    return this.tabs[removeIndex].link;
  }

  clear() {
    for (let i = 0; i < this.tabs.length; i++) {
      if (i === 0) {
        continue;
      }
      this.tabs.splice(i, 1);
      --i;
      --this.id;
    }
  }

  buildUrl(url, paras): string {
    let query = '';
    if (paras !== undefined) {
      Object.keys(paras).forEach(key => {
        if (query === '') {
          query += '?' + key + '=' + paras[key];
        } else {
          query += '&' + key + '=' + paras[key];
        }
      });
    }
    return url + query;
  }
}
