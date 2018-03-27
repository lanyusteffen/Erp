import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class EmployeeService {
  private employee$ = new Subject<any>();
  
  private state ={
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

  all() {
    return this.http.get('/employee/GetAll');
  }

  get() { return this.employee$.asObservable(); }

  list() {
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
      Status:1,
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        employees: data.EmployeeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.employee$.next(nextState);
    });
  }

  listDisabled() {
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
      Status:-99,
      PageIndex,
      PageSize
    }).subscribe(data => {
      const nextState = {
        ...this.state,
        employees: data.EmployeeList,
        currentPagination: data.Pagination
      };

      this.state = nextState;
      this.employee$.next(nextState);
    });
  }

  newOne() {
    const { currentEmployee } = this.state;

    return this.http.get('/Employee/GetForNew', {
    });
  }

  detail(employeeId) {
    return this.http.get(`/Employee/GetForModify?employeeId=${employeeId}`);
  }

  create(employee) {
    return this.http.post('/Employee/New', {
      employee
    });
  }

  modify(employee){
    return this.http.post('/Employee/Modify', {
      employee
    });
  }

  cancel(entityIdList) {
    return this.http.post('/Employee/Cancel', {
      entityIdList
    });
  }  

  remove(entityIdList) {
    return this.http.post('/Employee/Remove', {
      entityIdList
    });
  }

  restore(entityIdList) {
    return this.http.post('/Employee/Restore', {
      entityIdList
    });
  }

  onDepartmentChange(selected) {
    const nextState = {
      ...this.state,
      currentEmployee: selected
    };

    this.state = nextState;
    this.list();
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
