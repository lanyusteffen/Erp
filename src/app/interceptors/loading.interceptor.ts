import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/finally';

import { Observable } from 'rxjs/Observable';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private timer: any;

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.timer = setTimeout(() => {
      this.loadingService.open();
      clearTimeout(this.timer);
      this.timer = null;
    }, 200);

    return next
      .handle(req)
      .finally(() => {
        if (!this.timer) {
          this.loadingService.close();
        } else {
          clearTimeout(this.timer);
          this.timer = null;
        }
      });
  }
}
