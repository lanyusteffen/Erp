import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class FundsService {
  private funds$ = new Subject<any>();
  private state = {
    funds: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  get() { return this.funds$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
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
        funds: data.FundsAccountList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.funds$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
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
        funds: data.FundsAccountList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.funds$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/FundsAccount/GetForNew');
  }

  detail(fundsAccountId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/FundsAccount/GetForModify?fundsAccountId=${fundsAccountId}`);
  }

  create(fundsAccount, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/New', {
      fundsAccount
    });
  }

  update(fundsAccount, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Modify', {
      fundsAccount
    });
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Cancel', {
      entityIdList
    });
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
    return this.http.post('/FundsAccount/Remove', {
      entityIdList
    }, next, fallback);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/FundsAccount/Restore', {
      entityIdList
    }, next, fallback);
  }
}
