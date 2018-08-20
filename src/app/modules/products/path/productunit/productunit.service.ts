import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductUnitService {

  private productUnit$ = new Subject<any>();
  private productUnitDisabled$ = new Subject<any>();

  private state = {
    productUnit: [],
    currentQueryKey: '',
    productUnitParentId: 0,
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/GetList', {}, next, fallback, ModuleType.Product);
  }

  get() { return this.productUnit$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/ProductUnit/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        productUnits: data.ProductUnitList,
        currentPagination: data.ProductUnitPageQueryReq
      };

      this.state = nextState;
      this.productUnit$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/ProductUnit/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        productUnits: data.ProductUnitList,
        currentPagination: data.ProductUnitPageQueryReq
      };

      this.state = nextState;
      this.productUnitDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { productUnitParentId } = this.state;
    return this.http.post('/ProductUnit/GetForNew', { EntityId: productUnitParentId }, next, fallback, ModuleType.Product);
  }

  detail(productUnitId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/ProductUnit/GetForModify`, { EntityId: productUnitId }, next, fallback, ModuleType.Product);
  }

  create(productUnit, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/New', productUnit, next, fallback, ModuleType.Product);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/Modify', area, next, fallback, ModuleType.Product);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  onPageChange(pagination, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list(fallback, successNotify);
  }

  onSearch(queryKey, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list(fallback, successNotify);
  }

  onSearchDisabled(queryKey, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled(fallback, successNotify);
  }
}
