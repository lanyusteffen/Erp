import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RoleService {
  private roles$ = new Subject<any>();
  private state = {
    roles: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  get() { return this.roles$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Role/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize,
    }, data => {
      const nextState = {
        ...this.state,
        roles: data.RoleList,
        currentPagination: data.RolePageQueryReq
      };

      this.state = nextState;
      this.roles$.next(nextState);

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

    return this.http.post('/Role/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        roles: data.RoleList,
        currentPagination: data.RolePageQueryReq
      };

      this.state = nextState;
      this.roles$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Role/GetForNew', {}, next, fallback, ModuleType.Admin);
  }

  detail(roleId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Role/GetForModify`, { EntityId: roleId }, next, fallback, ModuleType.Admin);
  }

  create(role, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Role/New', role, next, fallback, ModuleType.Admin);
  }

  update(role, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Role/Modify', role, next, fallback, ModuleType.Admin);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Role/Cancel', {
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
    return this.http.post('/Role/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Role/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }
}
