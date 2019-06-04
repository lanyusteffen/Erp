import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../../path/role/role.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: RoleSelectorComponent, multi: true }
  ]
})

export class RoleSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;
  private dataInitialized = false;

  @Output() selectChanged: EventEmitter<any> = new EventEmitter();

  @Input()
  private isEditing = false;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectRole: SelectComponent;

  constructor(
    private roleService: RoleService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.dataInitialized = true;
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.roleService
    .all(data => {
      this.list = data.map(item => ({
        label: item.Name,
        value: item.Id
      }));
      if (next !== null) {
        next();
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Role, err);
    });
  }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || -1;
        this.selectRole.value = this.innerValue;
      });
    } else {
      this.innerValue = value || -1;
      this.selectRole.value = this.innerValue;
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
        label: this.selectRole.label,
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
