import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class EmployeeService {
  private employee$ = new Subject<any>();

  private state = {
    employee: [],
    currentQueryKey: '',
    currentEmployee: { Id: null },
    currentPagination: {
      PageIndex: 1,
      PageSize: 25,
      TotalCount: 0
    }
  };


  constructor(private http: HttpService) {
  }

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/employee/GetAll', next, fallback, ModuleType.Basic);
  }

  get() { return this.employee$.asObservable(); }

  succeessNotifyCallback(successNotify?): void {
    if (successNotify !== undefined) {
      successNotify();
    }
  }

  list(fallback: (error: any) => void, successNotify?: () => void) {
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
      const nextState = {
        ...this.state,
        employees: data.EmployeeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.employee$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  listDisabled(fallback: (error: any) => void, successNotify?: () => void) {
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
      Status: -99,
      PageIndex,
      PageSize
    }, data => {
      const nextState = {
        ...this.state,
        employees: data.EmployeeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.employee$.next(nextState);

      this.succeessNotifyCallback(successNotify);
    }, fallback, ModuleType.Basic);
  }

  newOne(next: (data: any) => void, fallback: (error: any) => void) {
    const { currentEmployee } = this.state;

    return this.http.get('/Employee/GetForNew', next, fallback, ModuleType.Basic);
  }

  detail(employeeId, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get(`/Employee/GetForModify?employeeId=${employeeId}`, next, fallback, ModuleType.Basic);
  }

  create(employee, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Employee/New', {
      employee
    }, next, fallback, ModuleType.Basic);
  }

  modify(employee, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Employee/Modify', {
      employee
    }, next, fallback, ModuleType.Basic);
  }

  cancel(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Employee/Cancel', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  remove(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Employee/Remove', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  restore(entityIdList, next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.post('/Employee/Restore', {
      entityIdList
    }, next, fallback, ModuleType.Basic);
  }

  onDepartmentChange(selected, fallback: (error: any) => void, successNotify?: () => void) {
    const nextState = {
      ...this.state,
      currentEmployee: selected
    };

    this.state = nextState;
    this.list(fallback, successNotify);
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
