import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as settings from '../../assets/appsettings.json';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
    private router: Router, private authservice: AuthService) { }

  private addRequestHeader(dict?: { [key: string]: string | string[]; }): HttpHeaders {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.append('Accept', '*/*');

    // 使用--strictNullChecks参数进行编译
    // type T1 = (x?: number) => string;              // x的类型是 number | undefined
    if (dict !== undefined) {
      for (const key in dict) {
        if (key) {
          headers.append(key, dict[key]);
        }
      }
    }

    return headers;
  }

  private parseParams(params: any): HttpParams {

    let ret = new HttpParams();

    if (params) {
      for (const key in params) {
        if (typeof params[key] !== 'undefined') {
          ret = ret.set(key, `${params[key]}`);
        }
      }
    }

    return ret;
  }

  private getAbsoluteUrl(url: string, moduleType: ModuleType): string {
    if (url.startsWith('http')) {
      return url;
    }
    let modulePath = '';
    switch (moduleType) {

      case ModuleType.Admin:
        modulePath = 'Admin/api';
        break;

      case ModuleType.Basic:
        modulePath = 'Basic/api';
        break;

      case ModuleType.Finance:
        modulePath = 'Finance/api';
        break;

      case ModuleType.Inventory:
        modulePath = 'Inventory/api';
        break;

      case ModuleType.Product:
        modulePath = 'Product/api';
        break;

      case ModuleType.Purchase:
        modulePath = 'Purchase/api';
        break;

      case ModuleType.Sale:
        modulePath = 'Sale/api';
        break;

      case ModuleType.Webadmin:
        modulePath = 'Webadmin/api';
        break;
    }

    return (<any>settings).CrossProxyURL + '/' + modulePath
      + (url.startsWith('/') ? '' : '/') + url;
  }

  checkAuthenticateResponse(err: any, fallback: (error: any) => void) {
    if (err instanceof Response) {
      const resp = err as Response;
      if (resp.status === 401) {
        this.authservice.logout();
        this.router.navigate(['/authorize/login']);
      } else {
        fallback(err);
      }
    } else {
      fallback(err);
    }
  }

  public post(url: string, postData: any, next: (data: any) => void,
    fallback: (error: any) => void, moduleType: ModuleType,
    params?: Object, dict?: { [key: string]: string | string[]; }): void {
    const headers = this.addRequestHeader(dict);
    this.http.post(this.getAbsoluteUrl(url, moduleType), postData,
      { headers: headers, observe: 'body', params: this.parseParams(params) })
      .subscribe(
        data => {
          next(data);
        },
        err => {
          this.checkAuthenticateResponse(err, fallback);
        }
      );
  }

  public get(url: string, next: (value: any) => void,
    fallback: (error: any) => void, moduleType: ModuleType,
    params?: Object, headerDict?: { [key: string]: string | string[]; }): void {
    const headers = this.addRequestHeader(headerDict);
    this.http.get(this.getAbsoluteUrl(url, moduleType), { headers: headers, observe: 'body', params: this.parseParams(params) })
      .subscribe(
        data => {
          next(data);
        },
        err => {
          this.checkAuthenticateResponse(err, fallback);
        }
      );
  }
}

export enum ModuleType {
  Admin,
  Basic,
  Finance,
  Product,
  Sale,
  Purchase,
  Inventory,
  Webadmin
}
