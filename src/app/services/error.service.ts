import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { MethodFn } from '@angular/core/src/reflection/types';

@Injectable()
export class ErrorService {
  private error$ = new Subject<any>();
  private errors = [];

  constructor() {}

  setErrorItems(errorItems) {
    this.errors = errorItems;
    this.error$.next(this.errors);
  }

  removeErrorItems(errorItems, propertyName) {
    let index = 0;
    errorItems.map((value) => {
      if (value.PropertyName === propertyName) {
        errorItems.splice(index, 1);
      }
      index = index + 1;
    });
  }

  clear() {
    this.errors = [];
    this.error$.next(this.errors);
  }

  get() {
    return this.error$.asObservable();
  }

  renderErrorItems(validForm: FormGroup, getErrorMessageFn: (key: string, controlErrors: ValidationErrors, keyError: string) => void) {
    const errorItems = new Array();

    Object.keys(validForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = validForm.get(key).errors;

      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          const item = {
            PropertyName: key,
            ErrorMessage: getErrorMessageFn(key, controlErrors, keyError)
          };
          errorItems.push(item);
        });
      }
    });

    this.setErrorItems(errorItems);
  }
}
