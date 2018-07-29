import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SystemUnitService } from '../../systemunit.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-systemunit-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class SystemUnitControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _systemUnitId: number;
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
  set systemUnitId(systemUnitId) {
    this._systemUnitId = systemUnitId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增系统单位' : '修改系统单位';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.systemUnitService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
          });
      } else {
        this.systemUnitService
          .detail(this._systemUnitId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
          });
      }
    }
  }

  get systemUnitId() {
    return this._systemUnitId;
  }

  constructor(
    private systemUnitService: SystemUnitService,
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
      this.systemUnitService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.SystemUnit, err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.systemUnitService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.systemUnitService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
