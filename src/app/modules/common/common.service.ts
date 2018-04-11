import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CommonService {
  private salePriceLevel$ = new Subject<any>();

  constructor(private http: HttpService) {}

  all(next: (data: any) => void, fallback: (error: any) => void) {
    return this.http.get('/SalePriceLevel/GetAll', next, fallback);
  }
}
