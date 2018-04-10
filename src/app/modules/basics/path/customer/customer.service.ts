import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppService } from '@services/app.service';

@Injectable()
export class CustomerService {
  private customers$ = new Subject<any>();
  private state = {
    customers: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  get() { return this.customers$.asObservable(); }

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
      CustomerType: 'Customer',
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        customers: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.customers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    });
  }

  contactList(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/CustomerContractor/GetList', {
      customerId
    }, next, fallback);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { currentCategory } = this.state;

    return this.http.get('/Customer/GetForNew', {
      customerType: 'Customer',
      customerCategoryId: currentCategory.Id
    }, next, fallback);
  }

  detail(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Customer/GetForModify?customerId=${customerId}`, next, fallback);
  }

  create(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/New', {
      customer
    }, next, fallback);
  }

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
      CustomerType: 'Customer',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        customers: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.customers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, error => {
      fallback(error);
    });
  }

  update(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Modify', {
      customer
    }, next, fallback);
  }

  remove(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Remove', {
      customerIdList
    }, next, fallback);
  }

  cancel(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Cancel', {
      customerIdList
    }, next, fallback);
  }

  restore(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Restore', {
      customerIdList
    }, next, fallback);
  }

  onCategoryChangeDisabled(selected, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  onCategoryChange(selected, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.list(fallback);
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
}
