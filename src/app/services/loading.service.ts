import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingService {
  private loading$ = new Subject<any>();
  private loadingCount = 0;

  constructor() {}

  open() {
    this.loadingCount++;
    this.loading$.next(!!this.loadingCount);
  }

  close() {
    this.loadingCount--;
    this.loading$.next(!!this.loadingCount);
  }

  get() {
    return this.loading$.asObservable();
  }
}
