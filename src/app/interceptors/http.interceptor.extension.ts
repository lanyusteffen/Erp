import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '@services/alert.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class HttpExtensionInterceptor implements HttpInterceptor {

  @SessionStorage()
  private authToken: string;

  @LocalStorage()
  private persistenceAuthToken: string;

  constructor(
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
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

    if (!this.loadingBar.visible) {
      this.loadingBar.start();
    }

    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {

          if (this.loadingBar.visible) {
            this.loadingBar.complete();
          }

          const { body } = event;

          if (typeof body.IsValid !== 'undefined' && !body.IsValid) {
            this.alertService.open({
              type: 'danger',
              content: body.ErrorMessages
            });
          }
        }
      });
  }
}
