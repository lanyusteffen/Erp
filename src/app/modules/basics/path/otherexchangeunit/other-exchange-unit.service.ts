import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class OtherExchangeUnitService {
  private otherExchangeUnits$ = new Subject<any>();
  private state = {
    otherExchangeUnits: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  get() { return this.otherExchangeUnits$.asObservable(); }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Customer/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      CustomerCategoryId: currentCategory.Id,
      CustomerType: 'Other',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        otherExchangeUnits: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.otherExchangeUnits$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback);
  }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Customer/GetListPaged', {
      QueryKey: currentQueryKey,
      CustomerCategoryId: currentCategory.Id,
      CustomerType: 'Other',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        otherExchangeUnits: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.otherExchangeUnits$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback);
  }

  contactList(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/CustomerContractor/GetList', next, fallback, {
      customerId
    });
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { currentCategory } = this.state;

    return this.http.get('/Customer/GetForNew', next, fallback, {
      customerType: 'Other',
      customerCategoryId: currentCategory.Id
    });
  }

  detail(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Customer/GetForModify?customerId=${customerId}`, next, fallback);
  }

  create(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/New', {
      customer
    }, next, fallback);
  }

  update(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Modify', {
      customer
    }, next, fallback);
  }

  cancel(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Cancel', {
      customerIdList
    }, next, fallback);
  }

  onCategoryChange(selected, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.list(fallback);
  }

  onCategoryChangeDisabled(selected, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.listDisabled(fallback);
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

  remove(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Remove', {
      customerIdList
    }, next, fallback);
  }

  restore(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Restore', {
      customerIdList
    }, next, fallback);
  }
}
