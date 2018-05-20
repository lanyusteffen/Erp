import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormGroup, ValidationErrors } from '@angular/forms';

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

  getFormValidationErrors(validForm: FormGroup) {

    Object.keys(validForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = validForm.get(key).errors;

      if (controlErrors != null) {

          Object.keys(controlErrors).forEach(error => {

          });
      }
    });
  }
}
