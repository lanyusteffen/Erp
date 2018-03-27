import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IncomeTypeService } from '../../incometype.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-incometype-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class IncomeTypeControlComponent {
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

  private _incomeTypeId: number;

  get incomeTypeId() {
    return this._incomeTypeId;
  }

  @Input()
  set incomeTypeId(incomeTypeId) {
    this._incomeTypeId = incomeTypeId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加收入类型';
    } else {
      return '修改收入类型';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        // this.incomeTypeService
        //   .newOne()
        //   .subscribe(data => {
          this.form = this.formService.createForm('{"Id":0,"Name":"","Code":""}');
        //   });
      } else {
        this.incomeTypeService
          .detail(this.incomeTypeId)
          .subscribe(data => {
            this.form = this.formService.createForm(data);
          });
      }
    }
  }

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private incomeTypeService: IncomeTypeService,
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
      this.incomeTypeService.create(value).subscribe(data => {
        if (data.IsValid) {
          this.onClose.emit();
          this.alertService.open({
            type: 'success',
            content: '添加成功！'
          });
          this.incomeTypeService.list();
        }
      });
    } else {
      this.incomeTypeService.update(value).subscribe(data => {
        if (data.IsValid) {
          this.onClose.emit();
          this.alertService.open({
            type: 'success',
            content: '修改成功！'
          });
          this.incomeTypeService.list();
        }
      });
    }
  }
}


