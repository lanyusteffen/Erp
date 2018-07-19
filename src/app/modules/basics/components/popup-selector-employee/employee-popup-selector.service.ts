import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EmployeePopupSelectService {

    private state = {
        employees: [],
        currentQueryKey: '',
        currentEmployee: { Id: null },
        currentPagination: {
            PageIndex: 1,
            PageSize: 10,
            TotalCount: 0
        }
    };

    list(next: (data: any) => void, fallback: (error: any) => void) {
        const {
            currentEmployee,
            currentQueryKey,
            currentPagination: {
                PageIndex,
                PageSize
            }
        } = this.state;

        return this.http.post('/Employee/GetListPaged', {
            QueryKey: currentQueryKey,
            EmployeeId: currentEmployee.Id,
            Status: 1,
            PageIndex,
            PageSize
        }, data => {
            next({
                ...this.state,
                employees: data.EmployeeList,
                currentPagination: data.EmployeePageQueryReq
            });
        }, fallback, ModuleType.Basic);
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

    constructor(private http: HttpService) {}
}
