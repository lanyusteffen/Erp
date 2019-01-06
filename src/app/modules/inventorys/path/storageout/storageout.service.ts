import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StorageOutService {
  private storageout$ = new Subject<any>();
  private storageoutDisabled$ = new Subject<any>();

  private state = {
    storageouts: [],
    currentNav: { Status: null, AuditStatus: null, BusinessStatus: null },
    queryItem: {
      BillType: null,
      BeginDate: null,
      EndDate: null,
      CustomerId: null,
      EmployeeId: null,
      DepartmentId: null,
      ProductId: null,
      GoodsId: null
    },
    currentQueryKey: '',
    areaParentId: 0,
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
    return this.http.get('/StorageOut/GetAll', next, fallback, ModuleType.Inventory);
  }

  get() { return this.storageout$.asObservable(); }

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
        ProductId,
        BillType
      },
      currentNav: {
        Status,
        AuditStatus,
        BusinessStatus
      }
    } = this.state;

    return this.http.post('/StorageOut/GetListPaged', {
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
      BusinessStatus,
      BillType
    }, data => {
      const nextState = {
        ...this.state,
        storageouts: data.StorageOutList,
        currentPagination: data.StorageOutPageQueryReq
      };

      this.state = nextState;
      this.storageout$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Webadmin);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      areaParentId,
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
        storageouts: data.StorageOutList,
        currentPagination: data.StorageOutPageQueryReq
      };

      this.state = nextState;
      this.storageoutDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Webadmin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/GetForNew', {}, next, fallback, ModuleType.Webadmin);
  }

  create(storageout, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageOut/New', storageout, next, fallback, ModuleType.Inventory);
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

  getQueryDateRange(fallback: (error: any) => void, bindData?: (data: any) => void) {
    return this.http.get('/Purchase/DateRange', data => {
      if (bindData !== undefined) {
        bindData(data);
      }
    }, fallback, ModuleType.Purchase);
  }
}
