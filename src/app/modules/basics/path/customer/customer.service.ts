import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppService } from '@services/app.service';

@Injectable()
export class CustomerService {
  private customers$ = new Subject<any>();
  private customersDisabled$ = new Subject<any>();

  private state = {
    customers: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  get() { return this.customers$.asObservable(); }

  getDisabled() { return this.customersDisabled$.asObservable(); }

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
    }, data => {
      const nextState = {
        ...this.state,
        customers: data.CustomerList,
        currentPagination: data.CustomerPageQueryReq
      };

      this.state = nextState;
      this.customers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Webadmin);
  }

  contactList(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/CustomerContractor/GetList', { CustomerId: customerId }, next, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { currentCategory } = this.state;

    return this.http.post('/Customer/GetForNew', {
      customerType: 'Customer',
      customerCategoryId: currentCategory.Id
    }, next, fallback, ModuleType.Basic);
  }

  detail(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Customer/GetForModify`, { EntityId: customerId }, next, fallback, ModuleType.Basic);
  }

  create(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/New', customer, next, fallback, ModuleType.Basic);
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
        currentPagination: data.CustomerPageQueryReq
      };

      this.state = nextState;
      this.customers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, error => {
      fallback(error);
    }, ModuleType.Webadmin);
  }

  update(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Modify', customer, next, fallback, ModuleType.Basic);
  }

  remove(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Remove', {
      EntityIdList: customerIdList
    }, next, fallback, ModuleType.Basic);
  }

  cancel(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Cancel', {
      EntityIdList: customerIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Restore', {
      EntityIdList: customerIdList
    }, next, fallback, ModuleType.Basic);
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
