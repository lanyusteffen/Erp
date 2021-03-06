﻿import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PurchaseService {
  private purchase$ = new Subject<any>();
  private purchaseDisabled$ = new Subject<any>();

  private state = {
    purchases: [],
    currentQueryKey: '',
    currentNav: { Status: null, AuditStatus: null, BusinessStatus: null },
    queryItem: { BeginDate: null, EndDate: null, CustomerId: null, EmployeeId: null, DepartmentId: null, ProductId: null, GoodsId: null },
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
      queryItem: {
        BeginDate,
        EndDate,
        CustomerId,
        EmployeeId,
        DepartmentId,
        GoodsId,
        ProductId
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
      BeginDate,
      EndDate,
      CustomerId,
      EmployeeId,
      DepartmentId,
      GoodsId,
      ProductId,
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
      queryItem: {
        BeginDate,
        EndDate,
        CustomerId,
        EmployeeId,
        DepartmentId,
        GoodsId,
        ProductId
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
      BeginDate,
      EndDate,
      CustomerId,
      EmployeeId,
      DepartmentId,
      GoodsId,
      ProductId,
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

  audit(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/Audit', {
      entityIdList
    }, next, fallback, ModuleType.Purchase);
  }

  unAudit(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/UnAudit', {
      entityIdList
    }, next, fallback, ModuleType.Purchase);
  }

  addNew(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/GetForNew', {}, next, fallback, ModuleType.Webadmin);
  }

  copyNew(entityId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/CopyForNew', { 
      entityId 
    }, next, fallback, ModuleType.Webadmin);
  }

  updateOne(entityId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/GetForModify', { 
      entityId 
    }, next, fallback, ModuleType.Webadmin);
  }

  create(purchase, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/New', purchase, next, fallback, ModuleType.Purchase);
  }

  modify(purchase, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Purchase/Modify', purchase, next, fallback, ModuleType.Purchase);
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

  onExecuteQuery(queryItem, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      queryItem: {
        ...this.state.queryItem,
        ...queryItem
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

  getQueryDateRange(fallback: (error: any) => void, bindData?: (data: any) => void) {
    return this.http.get('/Purchase/DateRange', data => {
      if (bindData !== undefined) {
        bindData(data);
      }
    }, fallback, ModuleType.Purchase);
  }
}
