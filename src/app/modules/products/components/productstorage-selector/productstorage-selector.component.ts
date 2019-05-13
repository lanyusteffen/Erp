import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { SelectComponent } from '@UI/select/select.component';
import { StorageService } from '../../path/storage/storage.service';

@Component({
  selector: 'app-product-storage-selector',
  templateUrl: './productstorage-selector.component.html',
  styleUrls: ['./productstorage-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ProductStorageSelectorComponent, multi: true }
  ]
})

export class ProductStorageSelectorComponent implements OnInit, ControlValueAccessor {

  @Output() selectChanged = new EventEmitter();

  @Input()
  private isEditing = false;

  // 获取模板内的第一个指定组件
  @ViewChild(SelectComponent)
  private selectProductStorage: SelectComponent;

  @Input()
  private _productId = -1;

  get productId(): number {
    return this._productId;
  }

  @Input('productId')
  set productId(value: number) {
    this._productId = value;
  }

  private list = [];
  private innerValue: any;
  private dataInitialized = false;

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor(private storageService: StorageService, private alertService: AlertService) { }

  ngOnInit() {
    if (!this.dataInitialized && !this.isEditing && this.productId > 0) {
      this.dataInitialized = true;
      this.bindListData(null);
    }
  }

  bindListData(next: () => void): void {
    this.storageService.dropdownList(data => {
      this.list = data.map(item => ({
        label: item.Name,
        value: item.Id
      }));
      if (next !== null) {
        next();
      }
    }, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Storage, err);
    });
  }

  writeValue(value) {
    if (!this.dataInitialized && this.productId > 0) {
      this.dataInitialized = true;
      this.bindListData(() => {
        this.innerValue = value || 0;
        this.selectProductStorage.value = this.innerValue;
      });
    } else {
      this.innerValue = value || 0;
      this.selectProductStorage.value = this.innerValue;
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
