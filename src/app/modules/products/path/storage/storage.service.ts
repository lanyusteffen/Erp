import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StorageService {
  private storage$ = new Subject<any>();
  private storageDisabled$ = new Subject<any>();

  private state = {
    storage: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) { }

  all(fallback: (error: any) => void, successNotify?: () => void) {
    return this.http.get('/Storage/GetAll', () => {
      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  get() { return this.storage$.asObservable(); }

  getDisabled() { return this.storageDisabled$.asObservable(); }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Storage/GetListPaged', {
      QueryKey: currentQueryKey,
      Status: 1,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        storages: data.StorageList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.storage$.next(nextState);

      this.succeessNotifyCallback(successNotify);

    }, fallback, ModuleType.Basic);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Storage/GetListPaged', {
      QueryKey: currentQueryKey,
      Status: -99,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        storages: data.StorageList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.storageDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);

    }, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { } = this.state;

    return this.http.get('/Storage/GetForNew', next, fallback, ModuleType.Basic);
  }

  detail(storageId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Storage/GetForModify?storageId=${storageId}`, next, fallback, ModuleType.Basic);
  }

  create(storage, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/New', storage, next, fallback, ModuleType.Basic);
  }

  modify(storage, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Modify', storage, next, fallback, ModuleType.Basic);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
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

}
