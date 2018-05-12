import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OtherExchangeUnitService } from '../../other-exchange-unit.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

const contractor = {
  Address: null,
  CreateUserName: null,
  CustomerId: 0,
  Email: null,
  ErrorMessages: null,
  Fax: null,
  Id: 0,
  IsOpenBill: false,
  IsValid: true,
  Mobile: null,
  Name: null,
  OpenBillTime: null,
  Remark: null,
  SortIndex: 0,
  Tel: null,
  UserName: null,
};

@Component({
  selector: 'app-otherexchangeunit-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class OtherExchangeUnitControlComponent {
  private contactList = [{}, {}, {}];
  private form = new FormGroup({});
  private _show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();


  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }
  @Input() type = 'create';

  private _customerId: number;

  get customerId() {
    return this._customerId;
  }

  @Input()
  set customerId(customerId) {
    this._customerId = customerId;
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加往来单位';
    } else {
      return '修改往来单位';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.otherExchangeUnitService
          .newOne(data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.getErrorCallBack(ModuleName.OtherExchangeUnit, err);
          });
      } else {
        this.otherExchangeUnitService
          .detail(this.customerId, data => {
            this.form = this.formService.createForm(data);
          }, (err) => {
            this.alertService.getErrorCallBack(ModuleName.OtherExchangeUnit, err);
          });
      }
    }
  }

  constructor(
    private otherExchangeUnitService: OtherExchangeUnitService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get contractorList(): FormArray { return this.form.get('CustomerContractorList') as FormArray; }
  get categoryName() { return this.form.get('CustomerCategoryName').value; }
  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }) {
    if (this.type === 'create') {
      this.otherExchangeUnitService.create(value, data => {
        if (data.IsValid) {
          this.otherExchangeUnitService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.OtherExchangeUnit, err);
          }, () => {
            this.onClose.emit();
            this.alertService.addSuccess();
          });
        } else {
          this.alertService.addFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
      this.otherExchangeUnitService.update(value, data => {
        if (data.IsValid) {
          this.otherExchangeUnitService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.OtherExchangeUnit, err);
          }, () => {
            this.onClose.emit();
            this.alertService.modifySuccess();
          });
        } else {
          this.alertService.modifyFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.modifyFail(err);
      });
    }
  }

  addContractor(idx) {
    const control = <FormArray>this.form.controls['CustomerContractorList'];

    control.insert(idx + 1, this.fb.group(contractor));
  }

  removeContractor(idx) {
    const control = <FormArray>this.form.controls['CustomerContractorList'];

    control.removeAt(idx);
  }
}


