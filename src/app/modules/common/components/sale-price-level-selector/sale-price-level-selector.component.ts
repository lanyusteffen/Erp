import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-sale-price-level-selector',
  templateUrl: './sale-price-level-selector.component.html',
  styleUrls: ['./sale-price-level-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SalePriceLevelSelectorComponent, multi: true }
  ]
})

export class SalePriceLevelSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService
      .all()
      .subscribe(data => {
        this.list = data.map(item => ({
          label: item.Name,
          value: item.Id
        }));
        this.innerValue = 0;
      });
  }

  writeValue(value) {
    this.innerValue = value;
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
