import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-employee-selector',
  templateUrl: './employee-selector.component.html',
  styleUrls: ['./employee-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EmployeeSelectorComponent, multi: true }
  ]
})

export class EmployeeSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;

  constructor(private employeeService: EmployeeService) {console.log(1);}

  ngOnInit() {
    this.employeeService
      .all()
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
