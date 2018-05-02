import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class FeeTypeService {
  private feeTypes$ = new Subject<any>();
  private state = {
    feeTypes: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  get() { return this.feeTypes$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/FeeType/GetListPaged', {
      QueryKey: currentQueryKey,
      BlanceType: 'Fee',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        feeTypes: data.FeeTypeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.feeTypes$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/FeeType/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      BlanceType: 'Fee',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        feeTypes: data.FeeTypeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.feeTypes$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/FeeType/GetForModify', next, fallback, ModuleType.Basic);
  }

  detail(feeTypeId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/FeeType/GetForModify?feeTypeId=${feeTypeId}`, next, fallback, ModuleType.Basic);
  }

  create(feeType, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FeeType/New', feeType, next, fallback, ModuleType.Basic);
  }

  update(feeType, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FeeType/Modify', feeType, next, fallback, ModuleType.Basic);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FeeType/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
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
    return this.http.post('/FeeType/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FeeType/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }
}
