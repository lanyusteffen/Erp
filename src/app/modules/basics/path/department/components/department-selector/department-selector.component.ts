import { Component, Input, OnInit } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-department-selector',
  templateUrl: './department-selector.component.html',
  styleUrls: ['./department-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DepartmentSelectorComponent, multi: true }
  ]
})

export class DepartmentSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departmentService
      .dropdownlist()
      .subscribe(data => {
        this.list = data.map(item => ({
          label: item.Name,
          value: item.Id
        }));
      });
  }

  writeValue(value) {
    this.innerValue = value || 0;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  handleChange(value) {
    this.innerValue = value;
    this.onChange(value);
  }
}
