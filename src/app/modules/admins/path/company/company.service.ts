import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CompanyService {
  private companys$ = new Subject<any>();
  private companysDisabled$ = new Subject<any>();

  private state = {
    companys: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      ItemCount: 0
    }
  };

  constructor(private http: HttpService) { }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/GetList', {}, next, fallback, ModuleType.Admin);
  }

  get() { return this.companys$.asObservable(); }

  getDisabled() { return this.companysDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Company/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize,
    }, data => {
      const nextState = {
        ...this.state,
        companys: data.CompanyList,
        currentPagination: data.CompanyPageQueryReq
      };

      this.state = nextState;
      this.companys$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Company/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        companys: data.CompanyList,
        currentPagination: data.CompanyPageQueryReq
      };

      this.state = nextState;
      this.companysDisabled$.next(nextState);

      if (successNotify !== undefined) {
        successNotify();
      }
    }, fallback, ModuleType.Admin);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/GetForNew', {}, next, fallback, ModuleType.Admin);
  }

  detail(companyId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Company/GetForModify`, { EntityId: companyId }, next, fallback, ModuleType.Admin);
  }

  create(company, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/New', company, next, fallback, ModuleType.Admin);
  }

  update(company, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/Modify', company, next, fallback, ModuleType.Admin);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  onPageChange(pagination, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list(fallback);
  }

  onPageChangeDisabled(pagination, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  onSearch(queryKey, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list(fallback);
  }

  onSearchDisabled(queryKey, fallback: (error: any) => void) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled(fallback);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Company/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Admin);
  }
}
