import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CategoryService {
  constructor(private http: HttpService) {}

  get(categoryType, resourceType, parentId = 0) {
    return this.http.get('/Category/GetAll', {
      categoryType,
      resourceType,
      parentId
    });
  }
}
