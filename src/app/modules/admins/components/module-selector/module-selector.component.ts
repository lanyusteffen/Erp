import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../path/menu/menu.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

@Component({
  selector: 'app-module-selector',
  templateUrl: './module-selector.component.html',
  styleUrls: ['./module-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ModuleSelectorComponent, multi: true }
  ]
})
export class ModuleSelectorComponent implements OnInit, ControlValueAccessor {

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

  constructor(private menuService: MenuService, private alertService: AlertService) { }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.dataInitialized = true;
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.menuService
    .listModule(data => {
      this.list = data.map(item => ({
        label: item.ModuleName,
        value: item.ModuleType
      }));
      if (next !== null) {
        next();
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Menu, err);
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
