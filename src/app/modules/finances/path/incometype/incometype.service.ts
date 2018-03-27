import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class IncomeTypeService {
  private incomeTypes$ = new Subject<any>();
  private state = {
    incomeTypes: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  get() { return this.incomeTypes$.asObservable(); }

  listDisabled() {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/FeeType/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      BlanceType: 'Income',
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        incomeTypes: data.FeeTypeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.incomeTypes$.next(nextState);
    });
  }

  list() {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/FeeType/GetListPaged', {
      QueryKey: currentQueryKey,
      BlanceType: 'Income',
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        incomeTypes: data.FeeTypeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.incomeTypes$.next(nextState);
    });
  }

  newOne() {
    return this.http.get('/FeeType/GetForModify');
  }

  detail(feeTypeId) {
    return this.http.get(`/FeeType/GetForModify?feeTypeId=${feeTypeId}`);
  }

  create(feeType) {
    return this.http.post('/FeeType/New', {
      feeType
    });
  }

  update(feeType) {
    return this.http.post('/FeeType/Modify', {
      feeType
    });
  }

  cancel(entityIdList) {
    return this.http.post('/FeeType/Cancel', {
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
    return this.http.post('/FeeType/Remove', {
      entityIdList
    });
  }

  restore(entityIdList) {
    return this.http.post('/FeeType/Restore', {
      entityIdList
    });
  }
}
