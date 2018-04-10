import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as settings from '../../assets/appsettings.json';

interface BodyMethodOption {
  params: Object;
  headers: Object;
}

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

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

    private getAbsoluteUrl(url: string): string {
        if (url.startsWith('http')) {
            return url;
        }
        return (<any>settings).BaseApiUrl + url;
    }

    public post(url: string, postData: any,
      next: (data: any) => void, fallback: (error: any) => void, dict?: { [key: string]: string | string[]; }): void {
        const headers = this.addRequestHeader(dict);
        this.http.post(this.getAbsoluteUrl(url), postData, { headers })
          .subscribe(
            data => {
              next(data);
            },
            error => {
              fallback(error);
            }
          );
    }

    public get(url: string, next: (value: any) => void,
      fallback: (error: any) => void, dict?: { [key: string]: string | string[]; }): void {
        const headers = this.addRequestHeader(dict);
        this.http.get(this.getAbsoluteUrl(url), { headers })
          .subscribe(
            data => {
              next(data);
            },
            error => {
              fallback(error);
            }
          );
    }
}
