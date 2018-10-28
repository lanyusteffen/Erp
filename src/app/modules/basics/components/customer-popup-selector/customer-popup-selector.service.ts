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

  changeStateQueryKey(queryKey: string) {
    this.changeCustomerStateQueryKey(queryKey);
    this.changeOtherStateQueryKey(queryKey);
    this.changeSupplierStateQueryKey(queryKey);
  }

  private changeCategorySupplierState(selected) {
    const nextState = {
      ...this.supplierState,
      currentCategory: selected,
      currentPagination: {
        ...this.supplierState.currentPagination,
        PageIndex: 1
      }
    };
    this.supplierState = nextState;
  }

  private changeCategoryCustomerState(selected) {
    const nextState = {
      ...this.customerState,
      currentCategory: selected,
      currentPagination: {
        ...this.customerState.currentPagination,
        PageIndex: 1
      }
    };
    this.customerState = nextState;
  }

  private changeCategoryOtherState(selected) {
    const nextState = {
      ...this.otherState,
      currentCategory: selected,
      currentPagination: {
        ...this.otherState.currentPagination,
        PageIndex: 1
      }
    };
    this.otherState = nextState;
  }

  private changeSupplierStateQueryKey(queryKey: string) {
    const nextState = {
      ...this.supplierState,
      currentQueryKey: queryKey,
      currentPagination: {
        ...this.supplierState.currentPagination,
        PageIndex: 1
      }
    };
    this.supplierState = nextState;
  }

  private changeCustomerStateQueryKey(queryKey: string) {
    const nextState = {
      ...this.customerState,
      currentQueryKey: queryKey,
      currentPagination: {
        ...this.customerState.currentPagination,
        PageIndex: 1
      }
    };
    this.customerState = nextState;
  }

  private changeOtherStateQueryKey(queryKey: string) {
    const nextState = {
      ...this.otherState,
      currentQueryKey: queryKey,
      currentPagination: {
        ...this.otherState.currentPagination,
        PageIndex: 1
      }
    };
    this.otherState = nextState;
  }

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
      CustomerCategoryId: currentCategory == null ? null : currentCategory.Id,
      CustomerType: 'Supplier',
      PageIndex,
      PageSize
    }, data => {
      next({
        ...this.supplierState,
        suppliers: data.CustomerList,
        currentPagination: data.CustomerPageQueryReq
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

    this.listSupplier(next, fallback);
  }

  onSearchSupplier(queryKey, next: (data: any) => void, fallback: (error: any) => void) {
    this.listSupplier(next, fallback);
  }

  onCategoryChangeSupplier(selected, next: (data: any) => void, fallback: (error: any) => void) {

    this.changeCategorySupplierState(selected);
    this.listSupplier(next, fallback);
  }

  listCustomer(next: (data: any) => void, fallback: (error: any) => void) {

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
      CustomerCategoryId: currentCategory == null ? null : currentCategory.Id,
      CustomerType: 'Customer',
      PageIndex,
      PageSize
    }, data => {
      next({
        ...this.customerState,
        customers: data.CustomerList,
        currentPagination: data.CustomerPageQueryReq
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

    this.listCustomer(next, fallback);
  }

  onSearchCustomer(queryKey, next: (data: any) => void, fallback: (error: any) => void) {
    this.listCustomer(next, fallback);
  }

  onCategoryChangeCustomer(selected, next: (data: any) => void, fallback: (error: any) => void) {

    this.changeCategoryCustomerState(selected);
    this.listCustomer(next, fallback);
  }

  listOther(next: (data: any) => void, fallback: (error: any) => void) {
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
      CustomerCategoryId: currentCategory == null ? null : currentCategory.Id,
      CustomerType: 'Other',
      PageIndex,
      PageSize
    }, data => {
      next({
        ...this.otherState,
        others: data.CustomerList,
        currentPagination: data.CustomerPageQueryReq
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

    this.listOther(next, fallback);
  }

  onSearchOther(queryKey, next: (data: any) => void, fallback: (error: any) => void) {
    this.listOther(next, fallback);
  }

  onCategoryChangeOther(selected, next: (data: any) => void, fallback: (error: any) => void) {

    this.changeCategoryOtherState(selected);
    this.listOther(next, fallback);
  }

  constructor(private http: HttpService) {}
}
