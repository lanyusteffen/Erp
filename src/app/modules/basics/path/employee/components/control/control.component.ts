import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { ErrorService } from '@services/error.service';
import { EmailValid } from '@validators/email.valid';
import { MobileValid } from '@validators/mobile.valid';
import { QQValid } from '@validators/qq.valid';
import { IDCardValid } from '@validators/idcard.valid';


@Component({
  selector: 'app-employee-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class EmployeeControlComponent {
  private form = new FormGroup({});
  private _show = false;
  private _employeeId: number;
  private errorItems = new Array();
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
  set employeeId(employeeId) {
    if (employeeId !== undefined) {
      this._employeeId = employeeId;
      this.showPop();
    }
  }


  public setErrorMessage(propertyName, displayName, errors): void {
    this.errorService.removeErrorItems(this.errorItems, propertyName);

    if (errors) {

      if (errors.maxlength) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'MaxLengthValidator',
          ErrorDescription: null,
          ErrorMessage: displayName + '长度不能超过 400',
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        this.errorItems.push(errorItem);
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
        this.errorItems.push(errorItem);
      }

      if (errors.result && !errors.result.valid) {
        const errorItem = {
          AttemptedValue: '',
          ErrorCode: 'CustomerValidator',
          ErrorDescription: null,
          ErrorMessage: errors.result.errMsg,
          ErrorStackTrace: null,
          PropertyName: propertyName
        };
        this.errorItems.push(errorItem);
      }

    }
    this.errorService.setErrorItems(this.errorItems);
  }

  private getValidators() {
    const validatorArrs = {
      Name: [
        Validators.maxLength(400),
        Validators.required
      ],
      Email: [
        EmailValid.validation
      ],
      Mobile: [
        MobileValid.validation
      ],
      QQ: [
        QQValid.validation
      ],
      IdentityCardNo: [
        IDCardValid.validation
      ]
    };
    return validatorArrs;
  }


  private showPop(): void {
    if (this._show) {
      if (this.type === 'create') {
        this.employeeService
          .newOne(data => {
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.alertService.getErrorCallBack(ModuleName.Employee, err);
          });
      } else {
        this.employeeService
          .detail(this._employeeId, data => {
            this.form = this.formService.createForm(data, this.getValidators());
          }, (err) => {
            this.alertService.getErrorCallBack(ModuleName.Employee, err);
          });
      }
    }
  }

  get employeeId() {
    return this._employeeId;
  }

  get title() {
    return this.type === 'create' ? '新增职员' : '修改职员';
  }

  constructor(
    private employeeService: EmployeeService,
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
      this.employeeService.list((err) => {
        this.alertService.listErrorCallBack(ModuleName.Employee, err);
      });
    }
  }

  onSubmit({ value }, IsValid) {
    if (IsValid) {
      if (value.Id === 0) {
        this.employeeService.create(value, data => {
          this.validate(data, '添加');
        }, (err) => {
          this.alertService.addFail(err);
        });
      } else {
        this.employeeService.modify(value, data => {
          this.validate(data, '修改');
        }, (err) => {
          this.alertService.modifyFail(err);
        });
      }
    }
  }
}


