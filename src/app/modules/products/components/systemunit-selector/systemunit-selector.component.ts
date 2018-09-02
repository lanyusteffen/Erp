import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SystemUnitService } from '../../path/systemunit/systemunit.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

@Component({
  selector: 'app-systemunit-selector',
  templateUrl: './systemunit-selector.component.html',
  styleUrls: ['./systemunit-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SystemuitSelectorComponent, multi: true }
  ]
})

export class SystemuitSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;
  private dataInitialized = false;

  @Input()
  private isEditing = false;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectArea: SelectComponent;

  constructor(private systemUnitService: SystemUnitService, private alertService: AlertService) { }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.systemUnitService
    .all(data => {
      this.list = data.map(item => ({
        label: item.Name,
        value: item.Id
      }));
      if (next !== null) {
        next();
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Area, err);
    });
  }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || 0;
        this.selectArea.value = this.innerValue;
      });
    } else {
      this.innerValue = value || 0;
      this.selectArea.value = this.innerValue;
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
