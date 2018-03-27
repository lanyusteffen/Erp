import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FundsService } from '../../funds.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-funds-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class FundsControlComponent {
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

  private _fundsId: number;

  get fundsId() {
    return this._fundsId;
  }

  @Input()
  set fundsId(fundsId) {
    this._fundsId = fundsId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加银行账户';
    } else {
      return '修改银行账户';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.fundsService
          .newOne()
          .subscribe(data => {
            this.form = this.formService.createForm(data);
        });
      } else {
        this.fundsService
          .detail(this.fundsId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private fundsService: FundsService,
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
      this.fundsService.create(value).subscribe(data => {
        if (data.IsValid) {
          this.onClose.emit();
          this.alertService.open({
            type: 'success',
            content: '添加成功！'
          });
          this.fundsService.list();
        }
      });
    } else {
      this.fundsService.update(value).subscribe(data => {
        if (data.IsValid) {
          this.onClose.emit();
          this.alertService.open({
            type: 'success',
            content: '修改成功！'
          });
          this.fundsService.list();
        }
      });
    }
  }
}


