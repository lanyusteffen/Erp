import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';
import { ProductUnitService } from '../../path/productunit/productunit.service';

@Component({
  selector: 'app-productunit-selector',
  templateUrl: './productunit-selector.component.html',
  styleUrls: ['./productunit-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ProductUnitSelectorComponent, multi: true }
  ]
})

export class ProductUnitSelectorComponent implements OnInit, ControlValueAccessor {

  @Output() selectChanged = new EventEmitter();

  @Input()
  private isEditing = false;

  @Input()
  private productId = -1;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectProductUnit: SelectComponent;

  private list = [];
  private innerValue: any;
  private dataInitialized = false;

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor(private productUnitService: ProductUnitService, private alertService: AlertService) { }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing) {
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.productUnitService.dropdownList(this.productId, data => {
      this.list = data.map(item => ({
        label: item.Name,
        value: item.Id
      }));
      if (next !== null) {
        next();
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.ProductUnit, err);
    });
  }

  writeValue(value) {
    if (!this.dataInitialized) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || 0;
        this.selectProductUnit.value = this.innerValue;
      });
    } else {
      this.innerValue = value || 0;
      this.selectProductUnit.value = this.innerValue;
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
