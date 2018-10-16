import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GoodsPopupSelectService {

    private state = {
        goods: [],
        currentQueryKey: '',
        currentCategory: null,
        currentPagination: {
            PageIndex: 1,
            PageSize: 10,
            TotalCount: 0
        }
    };

    list(next: (data: any) => void, fallback: (error: any) => void) {
        const {
            currentQueryKey,
            currentCategory,
            currentPagination: {
                PageIndex,
                PageSize
            }
        } = this.state;

        return this.http.post('/Goods/GetListPaged', {
            QueryKey: currentQueryKey,
            Status: 1,
            ProductCategoryId: currentCategory == null ? null : currentCategory.Id,
            PageIndex,
            PageSize
        }, data => {
            next({
                ...this.state,
                goods: data.GoodsList,
                propertyName1: data.PropertyName1,
                propertyName2: data.PropertyName2,
                currentPagination: data.GoodsPageQueryReq
            });
        }, fallback, ModuleType.Webadmin);
    }

    onSearch(queryKey, next: (data: any) => void, fallback: (error: any) => void) {

        const nextState = {
            ...this.state,
            currentQueryKey: queryKey,
            currentPagination: {
                ...this.state.currentPagination,
                PageIndex: 1
            }
        };

        this.state = nextState;
        this.list(next, fallback);
    }

    onPageChange(pagination, next: (data: any) => void, fallback: (error: any) => void) {

        const nextState = {
          ...this.state,
          currentPagination: {
            ...this.state.currentPagination,
            ...pagination
          }
        };

        this.state = nextState;
        this.list(next, fallback);
    }

    onCategoryChange(selected, next: (data: any) => void, fallback: (error: any) => void) {

        const nextState = {
            ...this.state,
            currentCategory: selected,
            currentPagination: {
                ...this.state.currentPagination,
                PageIndex: 1
            }
        };

        this.state = nextState;
        this.list(next, fallback);
    }

    constructor(private http: HttpService) {
    }
}
