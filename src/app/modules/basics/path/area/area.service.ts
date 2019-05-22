import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AreaService {
  private area$ = new Subject<any>();
  private areaDisabled$ = new Subject<any>();

  private state = {
    area: [],
    currentQueryKey: '',
    areaParentId: 0,
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
    return this.http.post('/Area/GetList', {}, next, fallback, ModuleType.Basic);
  }

  get() { return this.area$.asObservable(); }

  getDisabled() { return this.areaDisabled$.asObservable(); }

  list(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      areaParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Area/GetListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        areas: data.AreaList,
        currentPagination: data.AreaPageQueryReq
      };

      this.state = nextState;
      this.area$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
    const {
      currentQueryKey,
      areaParentId,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Area/GetCancelListPaged', {
      QueryKey: currentQueryKey,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        areas: data.AreaList,
        currentPagination: data.AreaPageQueryReq
      };

      this.state = nextState;
      this.areaDisabled$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { areaParentId } = this.state;

    return this.http.post('/Area/GetForNew', { EntityId: areaParentId }, next, fallback, ModuleType.Basic);
  }

  detail(areaId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post(`/Area/GetForModify`, { EntityId: areaId }, next, fallback, ModuleType.Basic);
  }

  create(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/New', area, next, fallback, ModuleType.Basic);
  }

  modify(area, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Modify', area, next, fallback, ModuleType.Basic);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }


  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Restore', {
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
}
