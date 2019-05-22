import { Injectable,  } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ErrorItem } from '@contracts/error.item';

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

  renderErrorItems(validForm: FormGroup, getErrorMessageFn: (key: string, controlErrors: ValidationErrors) => void) {
    const errorItems: {[key: string]: {[key: number]: ErrorItem}} = {};
    Object.keys(validForm.controls).forEach(field => {
      const controlErrors: ValidationErrors = validForm.get(field).errors;
      if (controlErrors != null && typeof controlErrors !== 'undefined') {
        let errorMessage = null;
        let item: any;
        errorItems[field] = {};
        if (typeof controlErrors[0] !== 'undefined') {
          let i = 0;
          while (typeof controlErrors[i] !== 'undefined') {
            const controlError = controlErrors[i];
            errorMessage = getErrorMessageFn(field, controlError);
            item = { ErrorMessage: errorMessage, PropertyName: controlError.propertyName };
            errorItems[field][controlError.row] = item;
            ++i;
          }
        } else {
          errorMessage = getErrorMessageFn(field, controlErrors);
          item = { ErrorMessage: errorMessage };
          errorItems[field][-1] = item;
        }
      }
    });
    this.setErrorItems(errorItems);
  }
}
