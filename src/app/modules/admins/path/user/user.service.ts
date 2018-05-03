import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class UserService {
  private users$ = new Subject<any>();
  private state = {
    users: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) { }

  get() { return this.users$.asObservable(); }

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
      PageSize,
      Status: 1
    }, data => {
      const nextState = {
        ...this.state,
        users: data.UserList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.users$.next(nextState);

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

    return this.http.post('/User/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize,
      Status: -99
    }, data => {
      const nextState = {
        ...this.state,
        users: data.UserList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.users$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
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

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/User/Cancel', {
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
