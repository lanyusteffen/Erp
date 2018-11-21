
import { FormGroup, FormArray, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PopupSelectorEmployeeComponent } from '../../../../basics/components/popup-selector-employee/popup-selector-employee.component';
import { CustomerPopupSelectorComponent } from '../../../../basics/components/customer-popup-selector/customer-popup-selector.component';
import { PopupSelectorGoodsComponent } from '../../../../products/components/popup-selector-goods/popup-selector-goods.component';
import { IDatePickerConfig } from 'ng2-date-picker';
import { StorageOutService } from '../storageout.service';
import { FormService } from '@services/form.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { angularMath } from 'angular-ts-math';


const storageOutItem = {
    BelongBillId: null,
    BelongBillCode: null,
    BelongBillTime: null,
    GoodsId: 0,
    ProductId: 0,
    Quanlity: 0,
    Price: null,
    Amount: null,
    StorageId: null,
    ProductUnitId: null,
    UnitTime: null,
    Spec: null,
    ProductUnitName: null,
    ProductColorValue: null,
    ProductSizeValue: null,
    Name: null,
};

@Component({
    selector: 'app-inventory-storageout-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.less'],
    providers: [FormService]
})

export class StorageOutNewComponent implements OnInit, OnDestroy {


    @ViewChild(CustomerPopupSelectorComponent)
    private customerPopupSelector: CustomerPopupSelectorComponent;

    @ViewChild(PopupSelectorGoodsComponent)
    private goodsPopupSelector: PopupSelectorGoodsComponent;

    private totalAmount: number = 0;
    private payedAmount: number = 0;
    private propertyName1 = null;
    private propertyName2 = null;
    private selectedCustomer: any;
    private selectedEmployee: any;
    private selectedGoods: number[] = [];
    private form = new FormGroup({});
    private datePickerConfig: IDatePickerConfig = {
        locale: 'zh-cn',
        format: 'YYYY-MM-DD HH:mm:ss'
    };

    showModal() {
        this.goodsPopupSelector.show = true;
    }

    get storageOutItemList(): FormArray { return this.form.get('StorageOutItemActionRequests') as FormArray; }
    get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

    constructor(
        private StorageOutService: StorageOutService,
        private formService: FormService,
        private fb: FormBuilder,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.newOne();
    }

    ngOnDestroy() {
    }



    selectAllStorage(selectedStorageId) {
        const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
        for (let i = 0; i < itemArr.length; i++) {
            itemArr.at(i).patchValue({ 'StorageId': selectedStorageId });
        }
    }

    selectCustomer(item: any): void {
        this.selectCustomer = item;
        this.customerPopupSelector.unSelect();
    }

    selectEmployee(item: any): void {
        this.selectedEmployee = item;
    }

    selectGoods(selectItems: any): void {

        selectItems.forEach(item => {

            let findIndex = this.selectedGoods.indexOf(item.Id);

            if (findIndex > -1) {
                findIndex = findIndex + 1;
                const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
                itemArr.removeAt(findIndex);
            }

            const newstorageOutItem = Object.assign({}, storageOutItem);

            newstorageOutItem.GoodsId = item.Id;
            newstorageOutItem.ProductUnitName = item.ProductUnitName;
            newstorageOutItem.ProductSizeValue = item.ProductSizeValue;
            newstorageOutItem.ProductColorValue = item.ProductColorValue;
            newstorageOutItem.Spec = item.Spec;
            newstorageOutItem.Quanlity = item.Quanlity;
            newstorageOutItem.Name = item.Name;
            newstorageOutItem.Price = item.Price;

            if (findIndex === -1) {
                findIndex = 1;
            }

            this.addstorageOutItem(findIndex, newstorageOutItem);
            this.selectedGoods.push(item.Id);
        });
    }

    onSubmit({ value }) {
        if (value.Id === 0) {
        } else {
        }
    }

    newOne() {
        this.StorageOutService
            .newOne(data => {
                data.StorageOutItemActionRequests = data.StorageOutItemActionRequests.map(item => ({
                    ...item,
                    Spec: null,
                    Quanlity: null,
                    Price: null,
                    ProductUnitName: null,
                    ProductColorValue: null,
                    ProductSizeValue: null
                }));
                this.propertyName1 = data.PropertyName1;
                this.propertyName2 = data.PropertyName2;
                this.form = this.formService.createForm(data);
            }, (err) => {
                this.alertService.getErrorCallBack(ModuleName.StorageOut, err);
            });
    }

    addstorageOutItem(idx, newstorageOutItem) {

        const control = <FormArray>this.form.controls['StorageOutItemActionRequests'];
        control.insert(idx, this.fb.group(newstorageOutItem));
    }

    addItem(idx) {
        const control = <FormArray>this.form.controls['StorageOutItemActionRequests'];
        const newstorageOutItem = Object.assign({}, storageOutItem);
        control.insert(idx + 1, this.fb.group(newstorageOutItem));
    }

    removeItem(idx) {

        const control = <FormArray>this.form.controls['StorageOutItemActionRequests'];
        control.removeAt(idx);
    }

    calculate(evt, source: string, index: number) {

        const itemArr = <FormArray>this.form.controls['StorageOutItemActionRequests'];
        const item = <FormGroup>itemArr.at(index);

        const quanlityCtrl = <AbstractControl>item.controls['Quanlity'];
        const priceCtrl = <AbstractControl>item.controls['Price'];
        const amountCtrl = <AbstractControl>item.controls['Amount'];

        const amount = quanlityCtrl.value * priceCtrl.value;

        amountCtrl.setValue(angularMath.getNumberWithDecimals(amount, 2));
    }
}
