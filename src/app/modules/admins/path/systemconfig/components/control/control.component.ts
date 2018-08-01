import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SystemConfigService } from '../../systemconfig.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { IDatePickerConfig } from 'ng2-date-picker';

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
    private systemConfig: any;
    private datePickerConfig: IDatePickerConfig = {
        locale: 'zh-cn',
        format: 'YYYY-MM-DD'
      };

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    constructor(
        private systemConfigService: SystemConfigService,
        private alertService: AlertService
    ) {
        this.subscription = this.systemConfigService
            .get()
            .subscribe();
    }

    ngOnInit() {
        this.systemConfigService.detail(
            (data) => {
                this.systemConfig = data;
            }, (e) => {
                this.systemConfigService.newOne((data) => { this.systemConfig = data; }, null);
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    
    handleClose() {
        this.onClose.emit();
    }

    onSubmit({ value }) {
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
}


