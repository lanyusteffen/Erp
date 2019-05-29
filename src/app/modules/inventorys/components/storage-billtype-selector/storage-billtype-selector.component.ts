import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';
import { StorageOutTypeEnumPublic } from '../../enums/storage-billtype.storage';

@Component({
  selector: 'app-storagebilltype-selector',
  templateUrl: './storage-billtype-selector.component.html',
  styleUrls: ['./storage-billtype-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: StorageBillTypeSelectorComponent, multi: true }
  ]
})

export class StorageBillTypeSelectorComponent implements OnInit, ControlValueAccessor {

  @Output() selectChanged = new EventEmitter();

  @Input()
  private isEditing = false;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectStorage: SelectComponent;

  private list: any[];
  private innerValue: any;
  private dataInitialized = false;

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor(
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.dataInitialized = true;
      this.bindListData(null);
    }
  }

  reset() {
    this.innerValue = 0;
    this.selectStorage.value = this.innerValue;
  }

  bindListData(next: () => void): void {
    const storageOutTypes = [];
    storageOutTypes.push({
      value: StorageOutTypeEnumPublic.Default,
      label: '默认'
    });
    storageOutTypes.push({
      value: StorageOutTypeEnumPublic.MaterialOut,
      label: '领料出库'
    });
    storageOutTypes.push({
      value: StorageOutTypeEnumPublic.Other,
      label: '其他类型'
    });
    storageOutTypes.push({
      value: StorageOutTypeEnumPublic.Out,
      label: '借出'
    });
    storageOutTypes.push({
      value: StorageOutTypeEnumPublic.OutWork,
      label: '委外加工'
    });
    this.list = storageOutTypes;
  }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || 0;
        this.selectStorage.value = this.innerValue;
      });
    } else {
      this.innerValue = value || 0;
      this.selectStorage.value = this.innerValue;
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
    this.selectChanged.emit(value);
  }
}