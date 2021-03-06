﻿import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SystemUnitService {

  private systemUnit$ = new Subject<any>();
  private systemUnitDisabled$ = new Subject<any>();

  private state = {
    systemUnit: [],
    currentQueryKey: '',
    systemUnitParentId: 0,
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
    return this.http.post('/SystemUnit/GetList', {}, next, fallback, ModuleType.Product);
  }

  get() { return this.systemUnit$.asObservable(); }

  getDisabled() { return this.systemUnitDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      systemUnitParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/SystemUnit/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        systemUnits: data.SystemUnitList,
        currentPagination: data.SystemUnitPageQueryReq
      };

      this.state = nextState;
      this.systemUnit$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      systemUnitParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/SystemUnit/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        systemUnits: data.SystemUnitList,
        currentPagination: data.SystemUnitPageQueryReq
      };

      this.state = nextState;
      this.systemUnitDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { systemUnitParentId } = this.state;
    return this.http.post('/SystemUnit/GetForNew', { EntityId: systemUnitParentId }, next, fallback, ModuleType.Product);
  }

  detail(systemUnitId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/SystemUnit/GetForModify`, { EntityId: systemUnitId }, next, fallback, ModuleType.Product);
  }

  create(systemUnit, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/SystemUnit/New', systemUnit, next, fallback, ModuleType.Product);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/SystemUnit/Modify', area, next, fallback, ModuleType.Product);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/SystemUnit/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/SystemUnit/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/SystemUnit/Restore', {
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
