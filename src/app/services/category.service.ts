import { Injectable } from '@angular/core';
import { HttpService, ModuleType } from './http.service';

@Injectable()
export class CategoryService {
  constructor(private http: HttpService) {}

  get(categoryType, resourceType, next: (data: any) => void, fallback: (error: any) => void, parentId = 0) {
    return this.http.get('/Category/GetAll', next, fallback, ModuleType.Erp, {
      categoryType,
      resourceType,
      parentId
    });
  }
}
