import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ReceiveService {
    private receive$ = new Subject<any>();
    private receiveDisabled$ = new Subject<any>();

    private state = {
        purchases: [],
        currentQueryKey: '',
        currentNav: { Status: null, AuditStatus: null, BusinessStatus: null },
        queryItem: {
            BeginDate: null,
            EndDate: null,
            CustomerId: null,
            EmployeeId: null,
            DepartmentId: null,
            ProductId: null,
            GoodsId: null },
        currentPagination: {
            PageIndex: 1,
            PageSize: 25,
            TotalCount: 0
        }
    };

    constructor(private http: HttpService) { }

    succeessNotifyCallback(successNotify?): void {
        if (successNotify !== undefined) {
            successNotify();
        }
    }

    all(next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.get('/Receive/GetAll', next, fallback, ModuleType.Finance);
    }

    get() { return this.receive$.asObservable(); }

    list(fallback: (error: any) => void, successNotify?: () => void) {
        const {
            currentQueryKey,
            currentPagination: {
                PageIndex,
                PageSize
            },
            queryItem: {
                BeginDate,
                EndDate,
                CustomerId,
                EmployeeId,
                DepartmentId,
                GoodsId,
                ProductId
            },
            currentNav: {
                Status,
                AuditStatus,
                BusinessStatus
            }
        } = this.state;

        return this.http.post('/Receive/GetListPaged', {
            QueryKey: currentQueryKey,
            PageIndex,
            PageSize,
            Status,
            BeginDate,
            EndDate,
            CustomerId,
            EmployeeId,
            DepartmentId,
            GoodsId,
            ProductId,
            AuditStatus,
            BusinessStatus
        }, data => {
            const nextState = {
                ...this.state,
                purchases: data.ReceiveList,
                currentPagination: data.ReceivePageQueryReq
            };

            this.state = nextState;
            this.receive$.next(nextState);

            this.succeessNotifyCallback(successNotify);
        }, fallback, ModuleType.Webadmin);
    }

    listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
        const {
            currentQueryKey,
            currentPagination: {
                PageIndex,
                PageSize
            },
            queryItem: {
                BeginDate,
                EndDate,
                CustomerId,
                EmployeeId,
                DepartmentId,
                GoodsId,
                ProductId
            },
            currentNav: {
                Status,
                AuditStatus,
                BusinessStatus
            }
        } = this.state;

        return this.http.post('/Receive/GetCancelListPaged', {
            QueryKey: currentQueryKey,
            PageIndex,
            PageSize,
            Status,
            BeginDate,
            EndDate,
            CustomerId,
            EmployeeId,
            DepartmentId,
            GoodsId,
            ProductId,
            AuditStatus,
            BusinessStatus
        }, data => {
            const nextState = {
                ...this.state,
                purchases: data.ReceiveList,
                currentPagination: data.ReceivePageQueryReq
            };

            this.state = nextState;
            this.receiveDisabled$.next(nextState);

            this.succeessNotifyCallback(successNotify);
        }, fallback, ModuleType.Webadmin);
    }

    audit(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/Audit', {
            entityIdList
        }, next, fallback, ModuleType.Finance);
    }

    unAudit(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/UnAudit', {
            entityIdList
        }, next, fallback, ModuleType.Finance);
    }

    addNew(next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/GetForNew', {}, next, fallback, ModuleType.Webadmin);
    }

    copyNew(entityId, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/CopyForNew', {
            entityId
        }, next, fallback, ModuleType.Webadmin);
    }

    updateOne(entityId, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/GetForModify', {
            entityId
        }, next, fallback, ModuleType.Webadmin);
    }

    create(receive, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/New', receive, next, fallback, ModuleType.Finance);
    }

    modify(receive, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/Modify', receive, next, fallback, ModuleType.Finance);
    }

    cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/Cancel', {
            entityIdList
        }, next, fallback, ModuleType.Finance);
    }

    remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/Remove', {
            entityIdList
        }, next, fallback, ModuleType.Finance);
    }

    restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
        return this.http.post('/Receive/Restore', {
            entityIdList
        }, next, fallback, ModuleType.Finance);
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

    onExecuteQuery(queryItem, fallback: (error: any) => void, successNotify?: () => void) {
        const nextState = {
            ...this.state,
            queryItem: {
                ...this.state.queryItem,
                ...queryItem
            }
        };

        this.state = nextState;
        this.list(fallback, successNotify);
    }

    onNavChange(selectedNav, fallback: (error: any) => void, successNotify?: () => void) {
        const nextState = {
            ...this.state,
            currentNav: {
                ...this.state.currentNav,
                ...selectedNav
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

    getQueryDateRange(fallback: (error: any) => void, bindData?: (data: any) => void) {
        return this.http.get('/Receive/DateRange', data => {
            if (bindData !== undefined) {
                bindData(data);
            }
        }, fallback, ModuleType.Finance);
    }
}
