import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductColorService } from '../../productcolor.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { ErrorService } from '@services/error.service';

@Component({
  selector: 'app-productcolor-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class ProductColorControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _productColorId: number;
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
  set productColorId(productColorId) {
    this._productColorId = productColorId;
    this.showPop();
  }

  get title() {
    return this.type === 'create' ? '新增商品颜色' : '修改商品颜色';
  }

  public setErrorMessage(propertyName, displayName, errors): void {
    const errorItems = new Array();
    if (errors) {

      if (errors.maxlength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: displayName + '长度不能超过 200',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        errorItems.push(errorItem);
      }
      if (errors.required) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'NotEmptyValidator',
          ErrorDescription: null,
          ErrorMessage: displayName + '必填',
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
      Name: [
        Validators.maxLength(200),
        Validators.required
      ],
      Code: [
        Validators.maxLength(200),
        Validators.required
      ]
    };
    return validatorArrs;
  }

  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.productColorService
          .newOne(data => {
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
          });
      } else {
        this.productColorService
          .detail(this._productColorId, data => {
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
          });
      }
    }
  }

  get productColorId() {
    return this._productColorId;
  }

  constructor(
    private productColorService: ProductColorService,
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
      this.productColorService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.ProductColor, err);
      });
    }
  }

  onSubmit({ value }) {
    if (value.Id === 0) {
      this.productColorService.create(value, data => {
        this.validate(data, '添加');
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.productColorService.modify(value, data => {
        this.validate(data, '修改');
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }
}
