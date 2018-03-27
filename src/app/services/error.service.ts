import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {
  private error$ = new Subject<any>();
  private errors = [];

  constructor() {}

  set(errors) {
    this.errors = errors;
    this.error$.next(this.errors);
  }

  remove(name) {
    this.errors = this.errors.filter(item => item.PropertyName !== name);
    this.error$.next(this.errors);
  }

  clear() {
    this.errors = [];
    this.error$.next(this.errors);
  }

  get() {
    return this.error$.asObservable();
  }
}
