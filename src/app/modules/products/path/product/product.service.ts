import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProductService {
  private product$ = new Subject<any>();
  private productDisabled$ = new Subject<any>();
  private productBarcode$ = new Subject<any>();

  private state = {
    product: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/Product/GetAll', next, fallback, ModuleType.Basic);
  }

  get() { return this.product$.asObservable(); }

  getDisabled() { return this.productDisabled$.asObservable(); }

  getBarcode() { return this.productBarcode$.asObservable(); }

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

    return this.http.post('/Product/GetListPaged', {
      QueryKey: currentQueryKey,
      ProductCategoryId: currentCategory.Id,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        products: data.ProductList,
        currentPagination: data.ProductPageQueryReq
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
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        products: data.ProductList,
        currentPagination: data.ProductPageQueryReq
      };

      this.state = nextState;
      this.productDisabled$.next(nextState);

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
        currentPagination: data.ProductBarCodePageQueryReq
      };

      this.state = nextState;
      this.productBarcode$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Product);
  }

  productExtensions(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/GetForModify', {
      EntityId: productId
    }, next, fallback, ModuleType.Webadmin);
  }

  getProductUnitList(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/ProductUnit/GetList', {
      ProductId: productId
    }, next, fallback, ModuleType.Product);
  }

  getStorageDetailList(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/StorageDetail/GetList', { productId }, next, fallback, ModuleType.Product);
  }

  createOrUpdate(storageDetailList,next:(data:any) => void,fallback:(error:any)=>void){

    const { } = this.state;

    return this.http.post('/StorageDetail/CreateOrUpdate',storageDetailList, next, fallback, ModuleType.Product);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { } = this.state;

    return this.http.post('/Product/GetForNew', {}, next, fallback, ModuleType.Product);
  }

  detail(productId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Product/GetForModify`, {
      EntityId: productId
    }, next, fallback, ModuleType.Product);
  }

  create(product, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/New', product, next, fallback, ModuleType.Product);
  }

  modify(product, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Modify', product, next, fallback, ModuleType.Product);
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
    }, next, fallback, ModuleType.Product);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Product);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Restore', {
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

  onBarCodePageChange(pagination, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.listBarcode(fallback, successNotify);
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
