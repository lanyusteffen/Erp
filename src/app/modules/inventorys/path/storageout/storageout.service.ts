import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StorageOutService {

  private storageOut$ = new Subject<any>();
  private storageOutDisabled$ = new Subject<any>();

  private state = {
    storageOut: [],
    currentQueryKey: '',
    storageOutParentId: 0,
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/GetList', {}, next, fallback, ModuleType.Inventory);
  }

  get() { return this.storageOut$.asObservable(); }

  getDisabled() { return this.storageOutDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/StorageOut/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        storageOuts: data.StorageOutList,
        currentPagination: data.StorageOutPageQueryReq
      };

      this.state = nextState;
      this.storageOut$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Inventory);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/StorageOut/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        storageOuts: data.StorageOutList,
        currentPagination: data.StorageOutPageQueryReq
      };

      this.state = nextState;
      this.storageOutDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Inventory);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { storageOutParentId } = this.state;
    return this.http.post('/StorageOut/GetForNew', { EntityId: storageOutParentId }, next, fallback, ModuleType.Inventory);
  }

  detail(storageOutId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/StorageOut/GetForModify`, { EntityId: storageOutId }, next, fallback, ModuleType.Inventory);
  }

  create(storageOut, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/New', storageOut, next, fallback, ModuleType.Inventory);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/Modify', area, next, fallback, ModuleType.Inventory);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Inventory);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Inventory);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Inventory);
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
