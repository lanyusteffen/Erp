import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AreaService {
  private area$ = new Subject<any>();

  private state ={
    area: [],
    currentQueryKey: '',
    areaParentId:0,
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  succeessNotifyCallback(successNotify?):void{
    if(successNotify!=undefined){
      successNotify();
    }
  }

  all() {
    return this.http.get('/Area/GetAll');
  }

  get() { return this.area$.asObservable(); }

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
      Status:1,
      PageIndex,
      PageSize
    },data => {
      const nextState = {
        ...this.state,
        areas: data.AreaList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.area$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    },fallback);
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

    return this.http.post('/Area/GetListPaged', {
      QueryKey: currentQueryKey,
      Status:-99,
      PageIndex,
      PageSize
    },data => {
      const nextState = {
        ...this.state,
        areas: data.AreaList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.area$.next(nextState);

      this.succeessNotifyCallback(successNotify)
    },fallback);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { areaParentId  } = this.state;

    return this.http.get('/Area/GetForNew', {
      areaParentId
    },next,fallback);
  }

  detail(areaId,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Area/GetForModify?areaId=${areaId}`,next,fallback);
  }

  create(area,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/New', {
      area
    },next,fallback);
  }

  modify(area,next: (data: any) => void, fallback: (error: any) => void){
    return this.http.post('/Area/Modify', {
      area
    },next,fallback);
  }

  cancel(entityIdList,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Cancel', {
      entityIdList
    },next,fallback);
  }
 

  remove(entityIdList,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Remove', {
      entityIdList
    },next,fallback);
  }

  restore(entityIdList,next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Area/Restore', {
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
}
