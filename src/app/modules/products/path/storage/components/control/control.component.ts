import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../storage.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';


@Component({
  selector: 'app-storage-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class StorageControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _storageId: number;

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
  set storageId(storageId) {
    this._storageId = storageId;
    this.showPop();
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.storageService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.getErrorCallBack(ModuleName.Storage, err);
          });
      } else {
        this.storageService
          .detail(this._storageId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.getErrorCallBack(ModuleName.Storage, err);
          });
      }
    }
  }


  get storageId() {
    return this._storageId;
  }

  get title() {
    return this.type === 'create' ? '新增仓库' : '修改仓库';
  }

  constructor(
    private storageService: StorageService,
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
      this.storageService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.Storage, err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.storageService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.storageService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}


