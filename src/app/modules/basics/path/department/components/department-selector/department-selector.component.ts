import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

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

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectEmployee: SelectComponent;

  constructor(private departmentService: DepartmentService, private alertService: AlertService) {  }

  ngOnInit() {
    this.departmentService
      .dropdownlist(data => {
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
    if (this.onChange) {
      this.onChange(value);
    }
  }
}
