import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { PermissionService } from '../../path/permission/permission.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

@Component({
  selector: 'app-button-style-selector',
  templateUrl: './button-style-selector.component.html',
  styleUrls: ['./button-style-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ButtonStyleSelectorComponent, multi: true }
  ]
})

export class ButtonStyleSelectorComponent implements OnInit, ControlValueAccessor {

  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;
  private dataInitialized = false;

  @Output() selectChanged: EventEmitter<any> = new EventEmitter();

  @Input()
  private required = false;

  @Input()
  private isEditing = false;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectButtonStyle: SelectComponent;

  constructor(private permissionService: PermissionService, private alertService: AlertService) { }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.dataInitialized = true;
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.permissionService
    .listButtonStyle(data => {
      this.list = data.map(item => ({
        label: item.StyleName,
        value: item.StyleType
      }));
      if (next !== null) {
        next();
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.ButtonStyle, err);
    });
  }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || -1;
        this.selectButtonStyle.value = this.innerValue;
        this.triggerChanged(value);
      });
    } else {
      this.innerValue = value || -1;
      this.selectButtonStyle.value = this.innerValue;
      this.triggerChanged(value);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  triggerChanged(setNewValue) {
    if (this.selectChanged && setNewValue) {
      this.selectChanged.emit({
        label: this.selectButtonStyle.label,
        value: setNewValue
      });
    }
  }

  handleChange(value) {
    this.innerValue = value;
    this.onChange(value);
    this.triggerChanged(value);
  }
}
