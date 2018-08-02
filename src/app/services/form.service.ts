import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Injectable()
export class FormService {
  constructor(private fb: FormBuilder) {}

  createForm(fields) {
    const formGroup = {};

    for (const key in fields) {
      if (Array.isArray(fields[key])) {
        formGroup[key] = this.fb.array(fields[key].map(_item => this.fb.group(_item)));
      } else {
        formGroup[key] = fields[key];
      }
    }
    return this.fb.group(formGroup);
  }
}
