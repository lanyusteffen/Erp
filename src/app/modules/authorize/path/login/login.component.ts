import { Component, Input } from '@angular/core';
import { AuthorizeService } from '../../authorize.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';

@Component({
    selector: 'app-login-control',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent {

    constructor(
        private authorizeService: AuthorizeService,
        private confirmService: ConfirmService,
        private alertService: AlertService,
        private tabsService: TabsService
    ) { }

    errorCallBack(err: any): void {
        this.alertService.open({
            type: 'danger',
            content: '获取登录信息失败!' + err
        });
    }

    loginCallBack(err: any): void {
        this.alertService.open({
            type: 'danger',
            content: '登录失败' + err
        });
    }


    getLoginRequest(): void {
        this.authorizeService.getLoginRequest(data => {

        }, (err) => { this.errorCallBack(err); });
    }

    onSubmit({ value }): void {
        if (value.Id === 0) {
            this.authorizeService.login(value, data => {
                if (data.IsValid) {
                    this.alertService.open({
                        type: 'success',
                        content: '登录成功'
                    });
                } else {
                    this.loginCallBack(data.err);
                }
            }, (err) => {
                this.loginCallBack(err);
            });
        }
    }
}

