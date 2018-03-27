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

  list() {
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
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        funds: data.FundsAccountList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.funds$.next(nextState);
    });
  }

  listDisabled() {
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
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        funds: data.FundsAccountList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.funds$.next(nextState);
    });
  }

  newOne() {
    return this.http.get('/FundsAccount/GetForNew');
  }

  detail(fundsAccountId) {
    return this.http.get(`/FundsAccount/GetForModify?fundsAccountId=${fundsAccountId}`);
  }

  create(fundsAccount) {
    return this.http.post('/FundsAccount/New', {
      fundsAccount
    });
  }

  update(fundsAccount) {
    return this.http.post('/FundsAccount/Modify', {
      fundsAccount
    });
  }

  cancel(entityIdList) {
    return this.http.post('/FundsAccount/Cancel', {
      entityIdList
    });
  }

  onPageChange(pagination) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list();
  }

  onPageChangeDisabled(pagination) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.listDisabled();
  }

  onSearch(queryKey) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list();
  }

  onSearchDisabled(queryKey) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled();
  }

  remove(entityIdList) {
    return this.http.post('/FundsAccount/Remove', {
      entityIdList
    });
  }

  restore(entityIdList) {
    return this.http.post('/FundsAccount/Restore', {
      entityIdList
    });
  }
}
