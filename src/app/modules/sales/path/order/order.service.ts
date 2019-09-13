import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SalesService {
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
    return this.http.get('/Sale/GetAll', next, fallback, ModuleType.Sale);
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

    return this.http.post('/Sale/GetListPaged', {
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
        purchases: data.SaleList,
        currentPagination: data.SalePageQueryReq
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

    return this.http.post('/Sale/GetCancelListPaged', {
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
        purchases: data.SaleList,
        currentPagination: data.SalePageQueryReq
      };

      this.state = nextState;
      this.purchaseDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Webadmin);
  }

  audit(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/Audit', {
      entityIdList
    }, next, fallback, ModuleType.Sale);
  }

  unAudit(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/UnAudit', {
      entityIdList
    }, next, fallback, ModuleType.Sale);
  }

  addNew(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/GetForNew', {}, next, fallback, ModuleType.Webadmin);
  }

  copyNew(entityId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/CopyForNew', { 
      entityId 
    }, next, fallback, ModuleType.Webadmin);
  }

  updateOne(entityId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/GetForModify', { 
      entityId 
    }, next, fallback, ModuleType.Webadmin);
  }

  create(purchase, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/New', purchase, next, fallback, ModuleType.Sale);
  }

  modify(purchase, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/Modify', purchase, next, fallback, ModuleType.Sale);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Sale);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Sale);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Sale/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Sale);
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
    return this.http.get('/Sale/DateRange', data => {
      if (bindData !== undefined) {
        bindData(data);
      }
    }, fallback, ModuleType.Sale);
  }
}
