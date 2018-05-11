import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CustomerPopupSelectorService {

  private customers$ = new Subject<any>();
  private suppliers$ = new Subject<any>();
  private others$ = new Subject<any>();

  private supplierState = {
    suppliers: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 10,
      TotalCount: 0
    }
  };

  private customerState = {
    customers: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 10,
      TotalCount: 0
    }
  };

  private otherState = {
    others: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 10,
      TotalCount: 0
    }
  };

  listSupplier(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.supplierState;

    return this.http.post('/Customer/GetListPaged', {
      QueryKey: currentQueryKey,
      CustomerCategoryId: currentCategory.Id,
      CustomerType: 'Supplier',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.supplierState,
        suppliers: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.supplierState = nextState;
      this.suppliers$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
  }

  listCustomers(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.customerState;

    return this.http.post('/Customer/GetListPaged', {
      QueryKey: currentQueryKey,
      CustomerCategoryId: currentCategory.Id,
      CustomerType: 'Customer',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.customerState,
        customers: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.customerState = nextState;
      this.others$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
  }

  listOthers(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.otherState;

    return this.http.post('/Customer/GetListPaged', {
      QueryKey: currentQueryKey,
      CustomerCategoryId: currentCategory.Id,
      CustomerType: 'Other',
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.otherState,
        others: data.CustomerList,
        currentPagination: data.Pagination
      };

      this.otherState = nextState;
      this.others$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Basic);
  }

  constructor(private http: HttpService) {}

  getCustomers() { return this.customers$.asObservable(); }
  getSuppliers() { return this.suppliers$.asObservable(); }
  getOthers() { return this.others$.asObservable(); }
}
