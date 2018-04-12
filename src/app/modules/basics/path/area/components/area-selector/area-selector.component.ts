import { Component, Input, OnInit } from '@angular/core';
import { AreaService } from '../../area.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-area-selector',
  templateUrl: './area-selector.component.html',
  styleUrls: ['./area-selector.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: AreaSelectorComponent, multi: true }
  ]
})

export class AreaSelectorComponent implements OnInit, ControlValueAccessor {
  private list = [];
  private innerValue: any;
  private onTouched;
  private onChange;

  constructor(private areaService: AreaService,private alertService:AlertService) {}

  ngOnInit() {
    this.areaService
      .all(data => {
        this.list = data.map(item => ({
          label: item.Name,
          value: item.Id
        }));
      },(err)=>{
        this.alertService.open({
          type: 'danger',
          content: '获取地区数据失败！'+err
        });
      });
  }

  writeValue(value) {
    this.innerValue = value || 0;
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
