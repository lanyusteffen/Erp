import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from '../../path/department/department.service';
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
  private dataInitialized = false;

  @Input()
  public isEditing = false;

  @Output() onSelectedChange: EventEmitter<any> = new EventEmitter();

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectDepartment: SelectComponent;

  constructor(private departmentService: DepartmentService, private alertService: AlertService) {  }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.dataInitialized = true;
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.departmentService
      .dropdownlist(data => {
        this.list = data.map(item => ({
          label: item.Name,
          value: item.Id
        }));
        if (next !== null) {
          next();
        }
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Department, err);
      });
  }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || -1;
        this.selectDepartment.value = this.innerValue;
      });
    } else {
      this.innerValue = value || -1;
      this.selectDepartment.value = this.innerValue;
    }
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
    if (this.onSelectedChange) {
      this.onSelectedChange.emit(value);
    }
  }
}
