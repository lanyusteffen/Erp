﻿import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FeeTypeService {

  private feetype$ = new Subject<any>();
  private feetypeDisabled$ = new Subject<any>();

  private state = {
    feetype: [],
    currentQueryKey: '',
    feeTypeParentId: 0,
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
    return this.http.post('/feetype/GetList', {}, next, fallback, ModuleType.Finance);
  }

  get() { return this.feetype$.asObservable(); }

  getDisabled(){ return this.feetypeDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      feeTypeParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/feetype/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        feeTypes: data.FeeTypeList,
        currentPagination: data.FeeTypePageQueryReq
      };

      this.state = nextState;
      this.feetype$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Finance);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      feeTypeParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/feetype/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        feeTypes: data.FeeTypeList,
        currentPagination: data.FeeTypePageQueryReq
      };

      this.state = nextState;
      this.feetypeDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Finance);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { feeTypeParentId } = this.state;
    return this.http.post('/feetype/GetForNew', { EntityId: feeTypeParentId }, next, fallback, ModuleType.Finance);
  }

  detail(feeTypeId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/feetype/GetForModify`, { EntityId: feeTypeId }, next, fallback, ModuleType.Finance);
  }

  create(feetype, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/feetype/New', feetype, next, fallback, ModuleType.Finance);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/feetype/Modify', area, next, fallback, ModuleType.Finance);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/feetype/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/feetype/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/feetype/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
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
}
