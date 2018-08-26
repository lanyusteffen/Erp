import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductSizeService {

  private productSize$ = new Subject<any>();
  private productSizeDisabled$ = new Subject<any>();

  private state = {
    productSize: [],
    currentQueryKey: '',
    productSizeParentId: 0,
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
    return this.http.post('/ProductSize/GetList', {}, next, fallback, ModuleType.Product);
  }

  get() { return this.productSize$.asObservable(); }

  getDisabled() { return this.productSizeDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/ProductSize/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        productSizes: data.ProductSizeList,
        currentPagination: data.ProductSizePageQueryReq
      };

      this.state = nextState;
      this.productSize$.next(nextState);

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

    return this.http.post('/ProductSize/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        productSizes: data.ProductSizeList,
        currentPagination: data.ProductSizePageQueryReq
      };

      this.state = nextState;
      this.productSizeDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {

    const { productSizeParentId } = this.state;
    return this.http.post('/ProductSize/GetForNew', { EntityId: productSizeParentId }, next, fallback, ModuleType.Product);
  }

  detail(productSizeId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/ProductSize/GetForModify`, { EntityId: productSizeId }, next, fallback, ModuleType.Product);
  }

  create(productSize, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductSize/New', productSize, next, fallback, ModuleType.Product);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductSize/Modify', area, next, fallback, ModuleType.Product);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductSize/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductSize/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductSize/Restore', {
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
