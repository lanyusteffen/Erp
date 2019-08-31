import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { ReceiveService } from '../receive.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { angularMath } from 'angular-ts-math';
import { DatePipe } from '@angular/common';
import { ErrorService } from '@services/error.service';
import { PrimaryKeyValid } from '@validators/primary-key.valid';
import { NumberDecimalValid } from '@validators/number-decimal.valid';
import { ReceiveItemValid } from '@validators/receive-item.valid';
import { ActivatedRoute } from '@angular/router';

//收款单
const receive = {
  BillTime: "0001-01-01 00:00:00",
  BillType: 0,
  Code: null,
  CompanyId: 0,
  CustomerId: 0,
  CustomerName: null,
  CustomerType: 0,
  EmployeeId: 0,
  EmployeeName: null,
  FinanceShouldPayActionRequest: {},
  FinanceShouoldReiceveActionRequest: {},
  Id: 0,
  Name: null,
  ReceiveAccountActionRequests: [],
  ReceiveBillActionRequests: [],
  ReceiveItemActionRequests: [],
  ReceiveTime: null,
  TotalCheckoutAmount: null,
  TotalDiscountAmount: null,
  TotalPayAmount: null
};

//收款单明细
const receiveItem = {
  BillCode: null,
  BillId: 0,
  BillType: 0,
  Code: null,
  CompanyId: 0,
  CurrentCheckOutAmount: null,
  Id: 0,
  Name: null,
  ReceiveId: 0
};

//收款账户
var receiveAccount = {
  AccountCode: null,
  AccountId: 0,
  AccountInfo: null,
  Code: null,
  CompanyId: 0,
  Id: 0,
  Name: null,
  PayAmount: 0,
  ReceiveId: 0
};

var receiveBill = {
  BillAmount: 0,
  BillCode: null,
  BillId: 0,
  BillTime: "0001-01-01 00:00:00",
  BillType: 0,
  CheckoutAmount: null,
  Code: null,
  CompanyId: 0,
  CustomerId: 0,
  CustomerType: 0,
  Id: 0,
  Name: null,
  Remark: null,
  SortIndex: 0,
  Status: 1,
  TransactionId: null,
  TransactionKey: null,
  UnCheckoutAmount: null,
  CurrentCheckOutAmount:null,
  UserId: 0,
  UserName: null

}

@Component({
  selector: 'app-receive-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less'],
  providers: [ FormService, DatePipe ]
})

export class ReceiveNewComponent implements OnInit, OnDestroy {

  @ViewChild(CustomerPopupSelectorComponent)
  private customerPopupSelector: CustomerPopupSelectorComponent;

  @ViewChild(PopupSelectorEmployeeComponent)
  private employeePopupSelector: PopupSelectorEmployeeComponent;

  private totalPayAmount: number | string;
  private totalCheckoutAmount: number | string;
  private errorItems = new Array();

  private selectedCustomer: any;
  private selectedEmployee: any;
  private form: FormGroup;
  private datePickerConfig: IDatePickerConfig = {
    locale: 'zh-cn',
    format: 'YYYY-MM-DD'
  };

  private subscribe: any;
  private isEditing: boolean;
  private operatorType: string;

  

  get receiveItemList(): FormArray {
    return this.form.get('ReceiveItemActionRequests') as FormArray;
  }

  get receiveBillList(): FormArray {
    return this.form.get('ReceiveBillActionRequests') as FormArray;
  }

  get receiveAccountList(): FormArray{
    return this.form.get('ReceiveAccountActionRequests') as FormArray;
  }

  get formReady(): boolean {
    if (this.form) {
      return !!Object.keys(this.form.controls).length;
    }
    return false;
  }

  constructor(
    private receiveService: ReceiveService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private errorService: ErrorService,
    private routeInfo: ActivatedRoute
  ) {
    this.totalPayAmount = 0.00;
    this.totalCheckoutAmount = 0.00;
  }

  ngOnInit() {
    this.subscribe = this.routeInfo.queryParamMap.subscribe(
      params => {
        const receiveId = params.get('id');
        this.operatorType = params.get('type');
        if (this.operatorType === 'new') {
          this.new();
          this.isEditing = false;
        } else if (this.operatorType === 'edit') {
          this.edit(receiveId);
          this.isEditing = true;
        } else if (this.operatorType === 'copy') {
          this.copy(receiveId);
          this.isEditing = true;
        }
      });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }


  selectCustomer(item: any): void {
    this.selectedCustomer = item;
    const customerTypeCtrl = <FormControl>this.form.controls['CustomerType'];
    const customerIdCtrl = <FormControl>this.form.controls['CustomerId'];
    customerTypeCtrl.setValue(this.customerPopupSelector.selectedTab);
    customerIdCtrl.setValue(item.Id);
    this.employeePopupSelector.reset();
  }

  selectEmployee(item: any): void {
    this.selectedEmployee = item;
    const employeeIdCtrl = <FormControl>this.form.controls['EmployeeId'];
    employeeIdCtrl.setValue(item.Id);
  }

  
  private reset(): void {

    this.totalPayAmount = 0.00;
    this.totalCheckoutAmount = 0.00;

    this.clearSummaryControl();

  }

  private clearSummaryControl(): void {
    (<FormControl>this.form.controls['TotalDiscountAmount']).patchValue(null);
    (<FormControl>this.form.controls['TotalDiscountRate']).patchValue(null);
  }

  onSubmit({ value }, isValid) {

    console.log(value);
      
    value.BillTime = this.datePipe.transform(<Date>value.BillTime, 'yyyy-MM-dd HH:mm:ss');

    this.resolveReceiveItems(value);
    
    return;

    if (isValid) {
    

      if (value.Id === 0) {
        this.receiveService.create(value, data => {
          if (data.IsValid) {
            this.alertService.open({
              type: 'success',
              content: '收款单' + data.Code + '新增成功！'
            });
            this.reset();
          } else {
            this.alertService.addFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.addFail(err);
        });
      } else {
        this.receiveService.modify(value, data => {
          if (data.IsValid) {
            this.alertService.open({
              type: 'success',
              content: '收款单' + data.Code + '修改成功！'
            });
            this.reset();
          } else {
            this.alertService.modifyFail(data.ErrorMessages);
          }
        }, (err) => {
          this.alertService.modifyFail(err);
        });
      }
    } else {
      this.errorService.renderErrorItems(this.form,
        (key, controlErrors) => this.getErrorMessage(key, controlErrors));
    }
  }

  resolveReceiveItems(receive){

    var receiveBillActionRequests = receive.ReceiveBillActionRequests;

    receive.ReceiveItemActionRequests = [];

    receiveBillActionRequests.forEach((val, idx, array) => {
     
      var receiveItemActionRequest ={
        BillId : val.BillId,
        BillCode : val.BillCode,
        BillType : val.BillType,
        CurrentCheckOutAmount : val.CurrentCheckOutAmount
      };

      receive.ReceiveItemActionRequests.push(receiveItemActionRequest);
    });

  }

  getErrorMessage(key: string, controlErrors: ValidationErrors) {
    switch (key) {
      case 'CustomerId':
        return '必须选择供应商!';
    }
    return controlErrors.errMsg;
  }

  private getValidators() {
    const validatorArrs = {
      CustomerId: [
        Validators.required,
        PrimaryKeyValid.validation
      ],
      TotalCheckoutAmount: [
        NumberDecimalValid.validation
      ],
      TotalDiscountAmount: [
        NumberDecimalValid.validation
      ],
      ReceiveAccountActionRequest: [
        ReceiveItemValid.validation
      ]
    };
    return validatorArrs;
  }

  copy(receiveId) {
    this.receiveService
    .copyNew(receiveId, data => {
      data.ReceiveTime = this.datePipe.transform(<Date>data.ReceiveTime, 'yyyy-MM-dd'),
      this.form = this.formService.createForm(data, this.getValidators());
    }, (err) => {
      this.alertService.getErrorCallBack(ModuleName.Receive, err);
    });
  }

  edit(receiveId) {
    this.receiveService
      .updateOne(receiveId, data => {
        data.ReceiveTime = this.datePipe.transform(<Date>data.ReceiveTime, 'yyyy-MM-dd'),
        this.form = this.formService.createForm(data, this.getValidators());
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Receive, err);
      });
  }

  new() {
    this.receiveService
      .addNew(data => {    
        data.BillTime = this.datePipe.transform(<Date>data.BillTime, 'yyyy-MM-dd'),
        this.form = this.formService.createForm(data, this.getValidators());
      }, (err) => {
        this.alertService.getErrorCallBack(ModuleName.Receive, err);
      });
  }

  addReceiveAccount(idx, newReceiveAccount) {

    const control = <FormArray>this.form.controls['ReceiveAccountActionRequests'];
    control.insert(idx, this.fb.group(newReceiveAccount));
  }

  addAccount(idx) {
    const control = <FormArray>this.form.controls['ReceiveAccountActionRequests'];
    const newReceiveAccount = Object.assign({}, receiveAccount);
    control.insert(idx + 1, this.fb.group(newReceiveAccount));
  }

  removeAccount(idx) {

    const control = <FormArray>this.form.controls['ReceiveAccountActionRequests'];
    control.removeAt(idx);
  }

  addReceiveBillItem(idx, newReceiveItem) {

    const control = <FormArray>this.form.controls['ReceiveBillActionRequests'];
    control.insert(idx, this.fb.group(newReceiveItem));
  }

  addBillItem(idx) {
    const control = <FormArray>this.form.controls['ReceiveBillActionRequests'];
    const newReceiveBill = Object.assign({}, receiveBill);
    control.insert(idx + 1, this.fb.group(newReceiveBill));
  }

  removeBillItem(idx) {

    const control = <FormArray>this.form.controls['ReceiveBillActionRequests'];
    control.removeAt(idx);
  }

  calculateBill(){

    const itemArr = <FormArray>this.form.controls['ReceiveBillActionRequests'];   

    let totalCheckoutAmount = 0;

    if(itemArr!=null){
      for (let i = 0; i < itemArr.length; i++) {
        const item = <FormGroup>itemArr.at(i);

        const payAmountCtrl = <FormControl>item.controls['CurrentCheckOutAmount'];

        if (payAmountCtrl != null && NumberDecimalValid.validation(payAmountCtrl) == null) {

          totalCheckoutAmount += Number(payAmountCtrl.value);
        }

      }
    }    
    
    this.totalCheckoutAmount = angularMath.getNumberWithDecimals(Number(totalCheckoutAmount), 2);
    
    return totalCheckoutAmount;
  }


  calculateAmount(source, index, hasCalculateAll) {

    const itemArr = <FormArray>this.form.controls['ReceiveAccountActionRequests'];   

    let totalPayAmount = 0;

    if(itemArr!=null){
      for (let i = 0; i < itemArr.length; i++) {
        const item = <FormGroup>itemArr.at(i);

        const payAmountCtrl = <FormControl>item.controls['PayAmount'];

        if (payAmountCtrl != null && NumberDecimalValid.validation(payAmountCtrl) == null) {

           totalPayAmount += Number(payAmountCtrl.value);
        }

      }
    }    
    
    this.totalPayAmount = angularMath.getNumberWithDecimals(Number(totalPayAmount), 2);
    
    return totalPayAmount;

  }
}
