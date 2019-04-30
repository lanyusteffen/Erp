import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

@Component({
  selector: 'app-buttontype-selector',
  templateUrl: './buttontype-selector.component.html',
  styleUrls: ['./buttontype-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ButtonTypeSelectorComponent, multi: true }
  ]
})

export class ButtonTypeSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;
  private dataInitialized = false;

  @Input()
  private isEditing = false;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectMenu: SelectComponent;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.bindListData(null);
    }
  }

    bindListData(next: () => void): void {
        this.list.push({
            label: '新增',
            value: 1
        });
        this.list.push({
            label: '修改',
            value: 2
        });
        this.list.push({
            label: '删除',
            value: 3
        });
        this.list.push({
            label: '停用',
            value: 4
        });
        this.list.push({
            label: '停用列表',
            value: 5
        });
        this.list.push({
            label: '打印',
            value: 6
        });
    }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || -1;
        this.selectMenu.value = this.innerValue;
      });
    } else {
      this.innerValue = value || -1;
      this.selectMenu.value = this.innerValue;
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
    this.onChange(value);
  }
}
