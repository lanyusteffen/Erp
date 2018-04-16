import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SupplierService {
  private suppliers$ = new Subject<any>();
  private state = {
    suppliers: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) { }

  get() { return this.suppliers$.asObservable(); }

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
      CustomerType: 'Supplier',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        suppliers: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.suppliers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
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
      CustomerType: 'Supplier',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        suppliers: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.suppliers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
  }

  contactList(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/CustomerContractor/GetList', next, fallback, ModuleType.Basic, {
      customerId
    });
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { currentCategory } = this.state;

    return this.http.get('/Customer/GetForNew', next, fallback, ModuleType.Basic, {
      customerType: 'Supplier',
      customerCategoryId: currentCategory.Id
    });
  }

  detail(customerId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Customer/GetForModify?customerId=${customerId}`, next, fallback, ModuleType.Basic);
  }

  create(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/New', {
      customer
    }, next, fallback, ModuleType.Basic);
  }

  update(customer, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Modify', {
      customer
    }, next, fallback, ModuleType.Basic);
  }

  cancel(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Cancel', {
      customerIdList
    }, next, fallback, ModuleType.Basic);
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
    }, next, fallback, ModuleType.Basic);
  }

  restore(customerIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Customer/Restore', {
      customerIdList
    }, next, fallback, ModuleType.Basic);
  }
}
