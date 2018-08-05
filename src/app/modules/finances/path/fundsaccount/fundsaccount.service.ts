import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FundsAccountService {

  private fundsAccount$ = new Subject<any>();
  private fundsAccountDisabled$ = new Subject<any>();

  private state = {
    fundsAccount: [],
    currentQueryKey: '',
    fundsAccountParentId: 0,
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
    return this.http.post('/FundsAccount/GetList', {}, next, fallback, ModuleType.Finance);
  }

  get() { return this.fundsAccount$.asObservable(); }

  getDisabled() { return this.fundsAccountDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      fundsAccountParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/FundsAccount/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        fundsAccounts: data.FundsAccountList,
        currentPagination: data.FundsAccountPageQueryReq
      };

      this.state = nextState;
      this.fundsAccount$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Finance);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      fundsAccountParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/FundsAccount/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        fundsAccounts: data.FundsAccountList,
        currentPagination: data.FundsAccountPageQueryReq
      };

      this.state = nextState;
      this.fundsAccountDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Finance);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { fundsAccountParentId } = this.state;
    return this.http.post('/FundsAccount/GetForNew', { EntityId: fundsAccountParentId }, next, fallback, ModuleType.Finance);
  }

  detail(fundsAccountId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/FundsAccount/GetForModify`, { EntityId: fundsAccountId }, next, fallback, ModuleType.Finance);
  }

  create(fundsAccount, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/New', fundsAccount, next, fallback, ModuleType.Finance);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Modify', area, next, fallback, ModuleType.Finance);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Finance);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Restore', {
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
