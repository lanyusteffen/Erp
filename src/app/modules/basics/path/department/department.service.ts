import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ModuleType } from '../../../../services/http.service';


@Injectable()
export class DepartmentService {
  private department$ = new Subject<any>();
  private departmentDisabled$ = new Subject<any>();

  private state = {
    department: [],
    currentCategory: { Id: null },
    currentQueryKey: '',
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
    return this.http.get('/Department/GetList', next, fallback, ModuleType.Basic);
  }

  dropdownlist(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Department/GetSimpleList', {}, next, fallback, ModuleType.Basic);
  }

  get() { return this.department$.asObservable(); }

  getDisabled() { return this.departmentDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Department/GetListPaged', {
      QueryKey: currentQueryKey,
      DepartmentCategoryId: currentCategory.Id,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        departments: data.DepartmentList,
        currentPagination: data.DepartmentPageQueryReq
      };

      this.state = nextState;
      this.department$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentCategory,
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Department/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      DepartmentCategoryId: currentCategory.Id,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        departments: data.DepartmentList,
        currentPagination: data.DepartmentPageQueryReq
      };

      this.state = nextState;
      this.departmentDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { currentCategory } = this.state;

    return this.http.post('/Department/GetForNew', {
      categoryId: currentCategory.Id == null ? 0 : currentCategory.Id
    }, next, fallback, ModuleType.Basic);
  }

  detail(departmentId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Department/GetForModify`, { EntityId: departmentId }, next, fallback, ModuleType.Basic);
  }

  create(department, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Department/New', department, next, fallback, ModuleType.Basic);
  }

  modify(department, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Department/Modify', department, next, fallback, ModuleType.Basic);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Department/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Department/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Department/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  onCategoryChange(selected, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.list(fallback, successNotify);
  }

  onDisabledCategoryChange(selected, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentCategory: selected
    };

    this.state = nextState;
    this.listDisabled(fallback, successNotify);
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
