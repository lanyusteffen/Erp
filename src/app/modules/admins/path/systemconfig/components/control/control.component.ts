import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SystemConfigService } from '../../systemconfig.service';
import { FormService } from '@services/form.service';
import { FormGroup } from '@angular/forms';
import { AlertService } from '@services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { IDatePickerConfig } from 'ng2-date-picker';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'app-systemconfig-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.less'],
    providers: [FormService]
})

export class SystemConfigControlComponent implements OnInit, OnDestroy {

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
        private systemConfigService: SystemConfigService,
        private alertService: AlertService,
        private formService: FormService,
        private loadingBar: SlimLoadingBarService
    ) {
        this.loadingBar.start();
        this.subscription = this.systemConfigService.get().subscribe();
    }

    ngOnInit() {
        this.systemConfigService.detail(
            (data) => {
                this.form = this.formService.createForm(data);
                this.type = 'Update';
                this.loadingBar.complete();
            }, (e) => {
                this.systemConfigService.newOne((data) => {
                    this.loadingBar.complete();
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
            this.systemConfigService.create(value, data => {
                if (data.IsValid) {
                    this.alertService.addSuccess();
                } else {
                    this.alertService.addFail(data.ErrorMessages);
                }
            }, (err) => {
                this.alertService.addFail(err);
            });
        } else {
            this.systemConfigService.update(value, data => {
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

    onSubmit({ value }, isValid) {
        if (!isValid) {
          return;
        }
        this.save({ value });
    }
}


