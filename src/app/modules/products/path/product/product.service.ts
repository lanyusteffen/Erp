import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProductService {
  private product$ = new Subject<any>();

  private state = {
    product: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) { }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/Product/GetAll', next, fallback, ModuleType.Basic);
  }

  get() { return this.product$.asObservable(); }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentCategory,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Product/GetProductListPaged', {
      QueryKey: currentQueryKey,
      ProductCategoryId: currentCategory.Id,
      Status: 1,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        products: data.ProductList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.product$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentCategory,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Product/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      ProductCategoryId: currentCategory.Id,
      Status: -99,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        products: data.ProductList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.product$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  listBarcode(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentCategory,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/ProductBarCode/GetListPaged', {
      QueryKey: currentQueryKey,
      Status: 1,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        barcodes: data.ProductBarCodeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.product$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  productExtensions(entityId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/GetProducExtendList', {
      entityId
    }, next, fallback, ModuleType.Basic);
  }

  getStorageDetailList(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/ProductStorageInit/GetStorageDetailList?productId=' + productId, next, fallback, ModuleType.Basic);
  }

  getStorageDetailSkuList(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/ProductStorageInit/GetStorageDetailSkuList?productId=' + productId, next, fallback, ModuleType.Basic);
  }

  getStorageDetailProductUnitList(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/ProductStorageInit/GetStorageDetailProductUnitList=' + productId, next, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { } = this.state;

    return this.http.get('/Product/GetForNew', next, fallback, ModuleType.Basic);
  }

  detail(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Product/GetForModify?productId=${productId}`, next, fallback, ModuleType.Basic);
  }

  create(product, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/New', {
      product
    }, next, fallback, ModuleType.Basic);
  }

  modify(product, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Modify', {
      product
    }, next, fallback, ModuleType.Basic);
  }

  modifyBarCode(product, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductBarCode/ModifyBarCode', {
      Id: product.Id,
      BarCode: product.BarCode
    }, next, fallback, ModuleType.Basic);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
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

  onSearchBarcode(queryKey, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listBarcode(fallback, successNotify);
  }

  onCategoryChange(selected, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.list(fallback, successNotify);
  }

}
