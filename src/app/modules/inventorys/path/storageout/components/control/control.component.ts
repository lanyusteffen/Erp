import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorageOutService } from '../../storageout.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { ErrorService } from '@services/error.service';

@Component({
  selector: 'app-storageout-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class StorageOutControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _storageOutId: number;
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
  set storageOutId(storageOutId) {
    this._storageOutId = storageOutId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增出库单' : '修改出库单';
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.storageOutService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
          });
      } else {
        this.storageOutService
          .detail(this._storageOutId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
          });
      }
    }
  }

  get storageOutId() {
    return this._storageOutId;
  }

  constructor(
    private storageOutService: StorageOutService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private errorService: ErrorService
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
      this.storageOutService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
      });
    }
  }


  public setErrorMessage(propertyName, errors): void {
    const errorItems = new Array();
    if (errors) {

      if (errors.maxLength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: '货品 长度不能超过 2500',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }
      if (errors.reqired) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: '货品 必填',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }


      if (errors.maxLength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: '商品 长度不能超过 2500',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }
      if (errors.reqired) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: '商品 必填',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }


      if (errors.maxLength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: '配送方式 长度不能超过 16',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }
      if (errors.reqired) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: '配送方式 必填',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }

    }
    this.errorService.setErrorItems(errorItems);
  }

  private getValidators() {
    const validatorArrs = {
      GoodsIdList: [
        Validators.maxLength(2500),
        Validators.required
      ],
      ProductIdList: [
        Validators.maxLength(2500),
        Validators.required
      ],
      DeliveryMode: [
        Validators.maxLength(16),
        Validators.required
      ]
    };
    return validatorArrs;
  }


  onSubmit({ value }) {
    if (value.Id === 0) {
      this.storageOutService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.storageOutService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
