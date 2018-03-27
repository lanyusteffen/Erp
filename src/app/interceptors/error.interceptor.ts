import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../services/error.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private alertService: AlertService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .do((event) => {
        if (event instanceof HttpResponse) {
          const { body } = event;

          if (typeof body.IsValid !== 'undefined' && !body.IsValid && body.ErrorProperty !== 'IsAlter') {
            this.errorService.set(body.Errors.ErrorItems);
          } else if (body.ErrorProperty === 'IsAlter') {
            this.alertService.open({
              type: 'danger',
              content: body.ErrorMessages
            });
          }
        }
      });
  }
}
