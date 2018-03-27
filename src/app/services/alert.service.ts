import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private alert$ = new Subject<any>();
  private alert = null;
  private id = 0;
  private timeout = null;

  constructor() {}

  open(alert) {
    this.alert = alert;
    this.alert$.next(this.alert);

    this.timeout = setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.alert = null;
    this.alert$.next(this.alert);

    clearTimeout(this.timeout);
    this.timeout = null;
  }

  get() {
    return this.alert$.asObservable();
  }
}
