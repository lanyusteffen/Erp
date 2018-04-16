import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AreaService } from '../../area.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';


@Component({
  selector: 'app-area-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class AreaControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _areaId: number;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @Input()
  get show() {
    return this._show;
  }

  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';

  @Input()
  set areaId(areaId) {
    this._areaId = areaId;
    this.showPop();
  }

  listErrorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '绑定地区列表失败!' + err
    });
  }


  get title() {
    return this.type === 'create' ? '新增地区' : '修改地区';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.areaService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '获取地区数据失败！' + err
            });
          });
      } else {
        this.areaService
          .detail(this._areaId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.open({
              type: 'danger',
              content: '获取地区数据失败' + err
            });
          });
      }
    }
  }

  get areaId() {
    return this._areaId;
  }

  constructor(
    private areaService: AreaService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  validate(data, option: string): void {
    if (data.IsValid) {
      this.onClose.emit();
      this.alertService.open({
        type: 'success',
        content: option + '成功！'
      });
      this.areaService.list((err) => {
        this.listErrorCallBack(err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.areaService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '添加失败' + err
        });
      });
    } else {
      this.areaService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.open({
          type: 'danger',
          content: '修改失败' + err
        });
      });
    }
  }
}


