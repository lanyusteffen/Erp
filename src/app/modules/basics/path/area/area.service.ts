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

  all() {
    return this.http.get('/Area/GetAll');
  }

  get() { return this.area$.asObservable(); }

  list() {
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
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        areas: data.AreaList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.area$.next(nextState);
    });
  }

  listDisabled() {
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
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        areas: data.AreaList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.area$.next(nextState);
    });
  }

  newOne() {
    const { areaParentId  } = this.state;

    return this.http.get('/Area/GetForNew', {
      areaParentId
    });
  }

  detail(areaId) {
    return this.http.get(`/Area/GetForModify?areaId=${areaId}`);
  }

  create(area) {
    return this.http.post('/Area/New', {
      area
    });
  }

  modify(area){
    return this.http.post('/Area/Modify', {
      area
    });
  }

  cancel(entityIdList) {
    return this.http.post('/Area/Cancel', {
      entityIdList
    });
  }
 

  remove(entityIdList) {
    return this.http.post('/Area/Remove', {
      entityIdList
    });
  }

  restore(entityIdList) {
    return this.http.post('/Area/Restore', {
      entityIdList
    });
  }

  onPageChange(pagination) {
    const nextState = {
      ...this.state,
      currentPagination: {
        ...this.state.currentPagination,
        ...pagination
      }
    };

    this.state = nextState;
    this.list();
  }

  onSearch(queryKey) {
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.list();
  }

  onSearchDisabled(queryKey){
    const nextState = {
      ...this.state,
      currentQueryKey: queryKey
    };

    this.state = nextState;
    this.listDisabled();
  }
}
