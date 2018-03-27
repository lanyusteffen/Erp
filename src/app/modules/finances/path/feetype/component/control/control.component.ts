import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeeTypeService } from '../../feetype.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-feetype-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class FeeTypeControlComponent {
  private form = new FormGroup({});
  private _show = false;

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }
  @Input() type = 'create';

  private _feeTypeId: number;

  get feeTypeId() {
    return this._feeTypeId;
  }

  @Input()
  set feeTypeId(feeTypeId) {
    this._feeTypeId = feeTypeId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加费用类型';
    } else {
      return '修改费用类型';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        // this.feeTypeService
        //   .newOne()
        //   .subscribe(data => {
             this.form = this.formService.createForm('{"Id":,"Name":"","Code":""}');
        //   });
      } else {
        this.feeTypeService
          .detail(this.feeTypeId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private feeTypeService: FeeTypeService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }) {
    if (this.type === 'create') {
      this.feeTypeService.create(value).subscribe(data => {
        if (data.IsValid) {
          this.onClose.emit();
          this.alertService.open({
            type: 'success',
            content: '添加成功！'
          });
          this.feeTypeService.list();
        }
      });
    } else {
      this.feeTypeService.update(value).subscribe(data => {
        if (data.IsValid) {
          this.onClose.emit();
          this.alertService.open({
            type: 'success',
            content: '修改成功！'
          });
          this.feeTypeService.list();
        }
      });
    }
  }
}


