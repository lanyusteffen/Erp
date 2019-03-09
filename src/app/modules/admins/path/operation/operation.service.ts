import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class OperationService {
  private operations$ = new Subject<any>();
  private operationDisabled$ = new Subject<any>();
  private state = {
    operations: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/GetList', {}, next, fallback, ModuleType.Admin);
  }

  get() { return this.operations$.asObservable(); }

  getDisabled() { return this.operationDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Operation/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        operations: data.OperationList,
        currentPagination: data.OperationPageQueryReq
      };

      this.state = nextState;
      this.operations$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Operation/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        operations: data.OperationList,
        currentPagination: data.OperationPageQueryReq
      };

      this.state = nextState;
      this.operationDisabled$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/GetForNew', {}, next, fallback, ModuleType.Admin);
  }

  detail(operationId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Operation/GetForModify`, { EntityId: operationId }, next, fallback, ModuleType.Admin);
  }

  create(operation, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/New', operation, next, fallback, ModuleType.Admin);
  }

  update(operation, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/Modify', operation, next, fallback, ModuleType.Admin);
  }

  changePassword(operation, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/ChangePassword', operation, next, fallback, ModuleType.Admin);
  }


  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  onPageChange(pagination, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list(fallback);
  }

  onPageChangeDisabled(pagination, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  onSearch(queryKey, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list(fallback);
  }

  onSearchDisabled(queryKey, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Operation/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }
}
