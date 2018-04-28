import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../services/error.service';
import { AlertService } from '../services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class HttpExtensionInterceptor implements HttpInterceptor {

  @SessionStorage()
  private authToken: string;

  @LocalStorage()
  private persistenceAuthToken: string;

  constructor(
    private errorService: ErrorService,
    private alertService: AlertService,
    private _loadingBar: SlimLoadingBarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.persistenceAuthToken !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + this.persistenceAuthToken
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + this.authToken
        }
      });
    }

    if (!this._loadingBar.visible) {
      this._loadingBar.start();
    }

    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {

          if (this._loadingBar.visible) {
            this._loadingBar.complete();
          }

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
      }, (err: any) => {

        if (this._loadingBar.visible) {
          this._loadingBar.complete();
        }

        this.alertService.open({
          type: 'danger',
          content: '网络异常!'
        });
      });
  }
}
