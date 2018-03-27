import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StorageService {
  private storage$ = new Subject<any>();

  private state ={
    storage: [],
    currentQueryKey: '',
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };

  constructor(private http: HttpService) {}

  all() {
    return this.http.get('/Storage/GetAll');
  }

  get() { return this.storage$.asObservable(); }

  list() {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Storage/GetListPaged', {
      QueryKey: currentQueryKey,
      Status:1,
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        storages: data.StorageList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.storage$.next(nextState);
    });
  }

  listDisabled() {
    const {
      currentQueryKey,
      currentPagination: {
        PageIndex,
        PageSize
      }
    } = this.state;

    return this.http.post('/Storage/GetListPaged', {
      QueryKey: currentQueryKey,
      Status:-99,
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        storages: data.StorageList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.storage$.next(nextState);
    });
  }

  newOne() {
    const {  } = this.state;

    return this.http.get('/Storage/GetForNew', {
    });
  }

  detail(storageId) {
    return this.http.get(`/Storage/GetForModify?storageId=${storageId}`);
  }

  create(storage) {
    return this.http.post('/Storage/New', {
      storage
    });
  }

  modify(storage){
    return this.http.post('/Storage/Modify', {
      storage
    });
  }

  cancel(entityIdList) {
    return this.http.post('/Storage/Cancel', {
      entityIdList
    });
  }

  remove(entityIdList) {
    return this.http.post('/Storage/Remove', {
      entityIdList
    });
  }

  restore(entityIdList) {
    return this.http.post('/Storage/Restore', {
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
