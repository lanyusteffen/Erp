﻿import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  private users$ = new Subject<any>();
  private userDisabled$ = new Subject<any>();
  private state = {
    users: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  get() { return this.users$.asObservable(); }

  getDisabled() { return this.userDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/User/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        users: data.UserList,
        currentPagination: data.UserPageQueryReq
      };

      this.state = nextState;
      this.users$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Webadmin);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/User/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        users: data.UserList,
        currentPagination: data.UserPageQueryReq
      };

      this.state = nextState;
      this.userDisabled$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Webadmin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/GetForNew', {}, next, fallback, ModuleType.Admin);
  }

  detail(userId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/User/GetForModify`, { EntityId: userId }, next, fallback, ModuleType.Admin);
  }

  create(user, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/New', user, next, fallback, ModuleType.Admin);
  }

  update(user, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/Modify', user, next, fallback, ModuleType.Admin);
  }

  changePassword(user, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/ChangePassword', user, next, fallback, ModuleType.Admin);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  onPageChange(pagination, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list(fallback, successNotify);
  }

  onPageChangeDisabled(pagination, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.listDisabled(fallback, successNotify);
  }

  onSearch(queryKey, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list(fallback, successNotify);
  }

  onSearchDisabled(queryKey, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled(fallback, successNotify);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }
}
