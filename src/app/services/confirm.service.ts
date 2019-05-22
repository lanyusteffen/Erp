import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfirmService {
  private confirm$ = new Subject<any>();
  private confirm = null;

  constructor() {}

  open(confirm) {
    this.confirm = confirm;
    this.confirm$.next(this.confirm);
  }

  close() {
    this.confirm = null;
    this.confirm$.next(this.confirm);
  }

  get() {
    return this.confirm$.asObservable();
  }
}
