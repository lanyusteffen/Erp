import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class MenuService {
  private menus$ = new Subject<any>();
  private menuDisabled$ = new Subject<any>();
  private state = {
    menus: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/GetList', {}, next, fallback, ModuleType.Admin);
  }

  allParent(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/GetParentList', {}, next, fallback, ModuleType.Admin);
  }

  get() { return this.menus$.asObservable(); }

  getDisabled() { return this.menuDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Menu/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        menus: data.MenuList,
        currentPagination: data.MenuPageQueryReq
      };

      this.state = nextState;
      this.menus$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Menu/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        menus: data.MenuList,
        currentPagination: data.MenuPageQueryReq
      };

      this.state = nextState;
      this.menuDisabled$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/GetForNew', {}, next, fallback, ModuleType.Admin);
  }

  detail(menuId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Menu/GetForModify`, { EntityId: menuId }, next, fallback, ModuleType.Admin);
  }

  create(menu, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/New', menu, next, fallback, ModuleType.Admin);
  }

  update(menu, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/Modify', menu, next, fallback, ModuleType.Admin);
  }

  changePassword(menu, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/ChangePassword', menu, next, fallback, ModuleType.Admin);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  onPageChange(pagination, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list(fallback);
  }

  onPageChangeDisabled(pagination, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  onSearch(queryKey, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list(fallback);
  }

  onSearchDisabled(queryKey, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Menu/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  listModule(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/Menu/GetModuleList', next, fallback, ModuleType.Admin);
  }
}
