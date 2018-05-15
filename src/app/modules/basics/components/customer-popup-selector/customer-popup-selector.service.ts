import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CustomerPopupSelectorService {

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

  listSupplier(next: (data: any) => void, fallback: (error: any) => void) {
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
      next({
        ...this.supplierState,
        suppliers: data.CustomerList,
        currentPagination: data.Pagination
      });
    }, fallback, ModuleType.Basic);
  }

  onPageChangeSupplier(pagination, next: (data: any) => void, fallback: (error: any) => void) {

    const nextState = {
      ...this.supplierState,
      currentPagination: {
        ...this.supplierState.currentPagination,
        ...pagination
      }
    };

    this.supplierState = nextState;

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
      next({
        ...this.supplierState,
        suppliers: data.CustomerList,
        currentPagination: data.Pagination
      });
    }, fallback, ModuleType.Basic);
  }

  listCustomers(next: (data: any) => void, fallback: (error: any) => void) {
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
      next({
        ...this.customerState,
        customers: data.CustomerList,
        currentPagination: data.Pagination
      });
    }, fallback, ModuleType.Basic);
  }

  onPageChangeCustomer(pagination, next: (data: any) => void, fallback: (error: any) => void) {

    const nextState = {
      ...this.customerState,
      currentPagination: {
        ...this.customerState.currentPagination,
        ...pagination
      }
    };

    this.customerState = nextState;

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
      next({
        ...this.customerState,
        customers: data.CustomerList,
        currentPagination: data.Pagination
      });
    }, fallback, ModuleType.Basic);
  }

  listOthers(next: (data: any) => void, fallback: (error: any) => void) {
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
      next({
        ...this.otherState,
        others: data.CustomerList,
        currentPagination: data.Pagination
      });
    }, fallback, ModuleType.Basic);
  }

  onPageChangeOther(pagination, next: (data: any) => void, fallback: (error: any) => void) {

    const nextState = {
      ...this.otherState,
      currentPagination: {
        ...this.otherState.currentPagination,
        ...pagination
      }
    };

    this.otherState = nextState;

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
      next({
        ...this.otherState,
        others: data.CustomerList,
        currentPagination: data.Pagination
      });
    }, fallback, ModuleType.Basic);
  }

  constructor(private http: HttpService) {}
}
