﻿import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OtherIncomeService {

  private otherIncome$ = new Subject<any>();

  private state = {
    otherIncome: [],
    currentQueryKey: '',
    otherIncomeParentId: 0,
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
    return this.http.post('/OtherIncome/GetList', {}, next, fallback, ModuleType.Finance);
  }

  get() { return this.otherIncome$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      otherIncomeParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/OtherIncome/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        otherIncomes: data.OtherIncomeList,
        currentPagination: data.OtherIncomePageQueryReq
      };

      this.state = nextState;
      this.otherIncome$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Finance);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      otherIncomeParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/OtherIncome/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        otherIncomes: data.OtherIncomeList,
        currentPagination: data.OtherIncomePageQueryReq
      };

      this.state = nextState;
      this.otherIncome$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Finance);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { otherIncomeParentId } = this.state;
    return this.http.post('/OtherIncome/GetForNew', { EntityId: otherIncomeParentId }, next, fallback, ModuleType.Finance);
  }

  detail(otherIncomeId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/OtherIncome/GetForModify`, { EntityId: otherIncomeId }, next, fallback, ModuleType.Finance);
  }

  create(otherIncome, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/OtherIncome/New', otherIncome, next, fallback, ModuleType.Finance);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/OtherIncome/Modify', area, next, fallback, ModuleType.Finance);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/OtherIncome/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/OtherIncome/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/OtherIncome/Restore', {
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
