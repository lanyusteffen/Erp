import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProductConfigService } from '../../productconfig.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-productconfig-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class ProductConfigControlComponent implements OnInit, OnDestroy {
  private form = new FormGroup({});
    private type: string;
    private subscription: Subscription;
    private radioChecked = false;
    private systemConfig: any;
    private datePickerConfig: IDatePickerConfig = {
        locale: 'zh-cn',
        format: 'YYYY-MM-DD HH:mm:ss'
    };

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

    constructor(
        private productConfigService: ProductConfigService,
        private alertService: AlertService,
        private formService: FormService
    ) {
        this.subscription = this.productConfigService.get().subscribe();
    }

    ngOnInit() {
        this.productConfigService.detail(
            (data) => {
                this.form = this.formService.createForm(data);
                this.type = 'Update';
            }, (e) => {
                this.productConfigService.newOne((data) => {
                    this.form = this.formService.createForm(data);
                    this.type = 'create';
                }, null);
            }
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    handleClose() {
        this.onClose.emit();
    }

    onOpenBill({ value }) {
        value.IsEnabled = true;
        this.save({ value });
    }

    save({ value }) {
        if (this.type === 'create') {
            this.productConfigService.create(value, data => {
                if (data.IsValid) {
                    this.alertService.addSuccess();
                } else {
                    this.alertService.addFail(data.ErrorMessages);
                }
            }, (err) => {
                this.alertService.addFail(err);
            });
        } else {
            this.productConfigService.update(value, data => {
                if (data.IsValid) {
                    this.alertService.modifySuccess();
                } else {
                    this.alertService.modifyFail(data.ErrorMessages);
                }
            }, (err) => {
                this.alertService.modifyFail(err);
            });
        }
    }

    onSubmit({ value }) {
        this.save({ value });
    }
}
