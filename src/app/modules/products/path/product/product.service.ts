import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProductService {
  private product$ = new Subject<any>();

  private state ={
    product: [],
    currentQueryKey: '',
    currentCategory: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  all() {
    return this.http.get('/Product/GetAll');
  }

  get() { return this.product$.asObservable(); }

  succeessNotifyCallback(successNotify?):void{
    if(successNotify!=undefined){
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
      ProductCategoryId:currentCategory.Id,
      Status:1,
      PageIndex,
      PageSize
    },data => {
      const nextState = {
        ...this.state,
        products: data.ProductList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.product$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    });
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
      ProductCategoryId:currentCategory.Id,
      Status:-99,
      PageIndex,
      PageSize
    },data => {
      const nextState = {
        ...this.state,
        products: data.ProductList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.product$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    });
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
      Status:1,
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        barcodes: data.ProductBarCodeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.product$.next(nextState);
    });
  }

  productExtensions(entityId,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.post('/Product/GetProducExtendList', {
      entityId
    },next,fallback);
  }

  getStorageDetailList(productId,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.get('/ProductStorageInit/GetStorageDetailList?productId='+productId,next,fallback);
  }

  getStorageDetailSkuList(productId,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.get('/ProductStorageInit/GetStorageDetailSkuList?productId='+productId,next,fallback);
  }

  getStorageDetailProductUnitList(productId,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.get('/ProductStorageInit/GetStorageDetailProductUnitList='+productId,next,fallback);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const {  } = this.state;

    return this.http.get('/Product/GetForNew', {
    },next,fallback);
  }

  detail(productId,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Product/GetForModify?productId=${productId}`);
  }

  create(product,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/New', {
      product
    },next,fallback);
  }

  modify(product,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.post('/Product/Modify', {
      product
    },next,fallback);
  }

  modifyBarCode(product,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.post('/ProductBarCode/ModifyBarCode', {
      Id :product.Id,
      BarCode:product.BarCode
    },next,fallback);
  }

  cancel(entityIdList,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Cancel', {
      entityIdList
    },next,fallback);
  }

  remove(entityIdList,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Remove', {
      entityIdList
    },next,fallback);
  }

  restore(entityIdList,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Product/Restore', {
      entityIdList
    },next,fallback);
  }

  onPageChange(pagination,fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list(fallback,successNotify);
  }

  onSearch(queryKey,fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list(fallback,successNotify);
  }

  onSearchDisabled(queryKey,fallback: (error: any) => void, successNotify?: () => void){
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled(fallback,successNotify);
  }

  onSearchBarcode(queryKey,fallback: (error: any) => void, successNotify?: () => void){
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listBarcode(fallback,successNotify);
  }

  onCategoryChange(selected,fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.list(fallback,successNotify);
  }

}
