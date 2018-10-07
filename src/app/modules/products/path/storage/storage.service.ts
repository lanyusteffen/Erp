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

  dropdownList(successNotify: (data: any) => void, fallback: (error: any) => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    this.http.post('/Storage/GetSimpleList', {
      QueryKey: currentQueryKey,
      Status: 1,
      PageIndex,
      PageSize
    }, successNotify, fallback, ModuleType.Product);
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

    }, fallback, ModuleType.Product);
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

    }, fallback, ModuleType.Product);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { } = this.state;

    return this.http.get('/Storage/GetForNew', next, fallback, ModuleType.Product);
  }

  detail(storageId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Storage/GetForModify?storageId=${storageId}`, next, fallback, ModuleType.Product);
  }

  create(storage, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/New', storage, next, fallback, ModuleType.Product);
  }

  modify(storage, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Modify', storage, next, fallback, ModuleType.Product);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Storage/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Product);
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
