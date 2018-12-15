import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export class FormService {
  constructor(private fb: FormBuilder) { }

  createArrayForm(key, array, validator = null) {
    const formGroup = {};
    if (validator !== undefined && validator != null) {
      formGroup[key] = this.fb.array(array.map(_item => this.fb.group(_item)), validator);
    } else {
      formGroup[key] = this.fb.array(array.map(_item => this.fb.group(_item)));
    }
    return this.fb.group(formGroup);
  }

  createForm(fields, validators = null) {
    const formGroup = {};
    for (const key in fields) {
      if (Array.isArray(fields[key])) {
        if (validators !== undefined && validators != null) {
          formGroup[key] = this.fb.array(fields[key].map(_item => this.fb.group(_item)), validators[key]);
        } else {
          formGroup[key] = this.fb.array(fields[key].map(_item => this.fb.group(_item)));
        }
      } else {
        if (validators !== undefined && validators != null) {
          formGroup[key] = new FormControl(fields[key], validators[key]);
        } else {
          formGroup[key] = fields[key];
        }
      }
    }
    return this.fb.group(formGroup);
  }
}
