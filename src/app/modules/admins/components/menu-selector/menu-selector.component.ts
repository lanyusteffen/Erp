import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../path/menu/menu.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';

@Component({
  selector: 'app-menu-selector',
  templateUrl: './menu-selector.component.html',
  styleUrls: ['./menu-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MenuSelectorComponent, multi: true }
  ]
})

export class MenuSelectorComponent implements OnInit, ControlValueAccessor {
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
      this.bindListData(null);
    }
  }

  reBind() {
    this.bindListData(null);
  }

  bindListData(next: () => void): void {
    this.menuService
    .allParent(data => {
      this.list = data.map(item => ({
        label: item.Name,
        value: item.Id
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
