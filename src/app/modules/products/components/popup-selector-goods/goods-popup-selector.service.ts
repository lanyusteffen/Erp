import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GoodsPopupSelectService {

    private state = {
        goods: [],
        currentQueryKey: '',
        ProductCategoryId: null,
        currentPagination: {
            PageIndex: 1,
            PageSize: 10,
            TotalCount: 0
        }
    };

    list(next: (data: any) => void, fallback: (error: any) => void) {
        const {
            currentQueryKey,
            currentPagination: {
                PageIndex,
                PageSize
            }
        } = this.state;

        return this.http.post('/Goods/GetListPaged', {
            QueryKey: currentQueryKey,
            Status: 1,
            PageIndex,
            PageSize
        }, data => {
            next({
                ...this.state,
                goods: data.GoodsList,
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

    constructor(private http: HttpService) {
    }
}
