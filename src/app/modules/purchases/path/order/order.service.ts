import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NavItem } from '@contracts/nav.item';


@Injectable()
export class PurchaseService {
  private purchase$ = new Subject<any>();
  private purchaseDisabled$ = new Subject<any>();

  private state = {
    purchases: [],
    currentQueryKey: '',
    currentNav: { Status: null, AuditStatus: null, BusinessStatus: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) { }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/Purchase/GetAll', next, fallback, ModuleType.Purchase);
  }

  get() { return this.purchase$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      },
      currentNav: {
        Status,
        AuditStatus,
        BusinessStatus
      }
    } = this.state;

    return this.http.post('/Purchase/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize,
      Status,
      AuditStatus,
      BusinessStatus
    }, data => {
      const nextState = {
        ...this.state,
        purchases: data.PurchaseList,
        currentPagination: data.PurchasePageQueryReq
      };

      this.state = nextState;
      this.purchase$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Webadmin);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      },
      currentNav: {
        Status,
        AuditStatus,
        BusinessStatus
      }
    } = this.state;

    return this.http.post('/Purchase/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize,
      Status,
      AuditStatus,
      BusinessStatus
    }, data => {
      const nextState = {
        ...this.state,
        purchases: data.PurchaseList,
        currentPagination: data.PurchasePageQueryReq
      };

      this.state = nextState;
      this.purchaseDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Webadmin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/GetForNew', {}, next, fallback, ModuleType.Webadmin);
  }

  create(purchase, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/New', purchase, next, fallback, ModuleType.Purchase);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/Modify', area, next, fallback, ModuleType.Purchase);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Purchase);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Purchase);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Purchase);
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

  onNavChange(selectedNav, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentNav: {
        ...this.state.currentNav,
        ...selectedNav
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
