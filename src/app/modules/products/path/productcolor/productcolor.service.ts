import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductColorService {

  private productColor$ = new Subject<any>();
  private productColorDisabled$ = new Subject<any>();

  private state = {
    productColor: [],
    currentQueryKey: '',
    productColorParentId: 0,
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
    return this.http.post('/ProductColor/GetList', {}, next, fallback, ModuleType.Product);
  }

  get() { return this.productColor$.asObservable(); }

  getDisabled() { return this.productColorDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/ProductColor/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        productColors: data.ProductColorList,
        currentPagination: data.ProductColorPageQueryReq
      };

      this.state = nextState;
      this.productColor$.next(nextState);

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

    return this.http.post('/ProductColor/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        productColors: data.ProductColorList,
        currentPagination: data.ProductColorPageQueryReq
      };

      this.state = nextState;
      this.productColorDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { productColorParentId } = this.state;
    return this.http.post('/ProductColor/GetForNew', { EntityId: productColorParentId }, next, fallback, ModuleType.Product);
  }

  detail(productColorId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/ProductColor/GetForModify`, { EntityId: productColorId }, next, fallback, ModuleType.Product);
  }

  create(productColor, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductColor/New', productColor, next, fallback, ModuleType.Product);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductColor/Modify', area, next, fallback, ModuleType.Product);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductColor/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductColor/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductColor/Restore', {
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
