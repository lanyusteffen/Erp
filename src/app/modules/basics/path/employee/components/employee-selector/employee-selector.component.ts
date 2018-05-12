import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

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

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectEmployee: SelectComponent;

  constructor(private employeeService: EmployeeService, private alertService: AlertService) {  }

  ngOnInit() {
    this.employeeService
      .all(data => {
        this.list = data.map(item => ({
          label: item.Name,
          value: item.Id
        }));
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Employee, err);
      });
  }

  writeValue(value) {
    this.innerValue = value || 0;
    this.selectEmployee.value = this.innerValue;
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
