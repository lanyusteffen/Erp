import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PermissionService {
  private permissions$ = new Subject<any>();
  private permissionDisabled$ = new Subject<any>();
  private state = {
    permissions: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  listButtonStyle(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/Permission/GetButtonStyleList', next, fallback, ModuleType.Admin);
  }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/GetList', {}, next, fallback, ModuleType.Admin);
  }

  allParent(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/GetParentList', {}, next, fallback, ModuleType.Admin);
  }

  get() { return this.permissions$.asObservable(); }

  getDisabled() { return this.permissionDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Permission/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        permissions: data.PermissionList,
        currentPagination: data.PermissionPageQueryReq
      };

      this.state = nextState;
      this.permissions$.next(nextState);

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

    return this.http.post('/Permission/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        permissions: data.PermissionList,
        currentPagination: data.PermissionPageQueryReq
      };

      this.state = nextState;
      this.permissionDisabled$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/GetForNew', {}, next, fallback, ModuleType.Admin);
  }

  detail(menuId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Permission/GetForModify`, { EntityId: menuId }, next, fallback, ModuleType.Admin);
  }

  create(menu, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/New', menu, next, fallback, ModuleType.Admin);
  }

  update(menu, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/Modify', menu, next, fallback, ModuleType.Admin);
  }

  changePassword(menu, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/ChangePassword', menu, next, fallback, ModuleType.Admin);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/Cancel', {
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
    return this.http.post('/Permission/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Permission/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }
}
