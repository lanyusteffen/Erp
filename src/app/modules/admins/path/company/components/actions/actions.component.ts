﻿import { Component, Input } from '@angular/core';
import { CompanyService } from '../../company.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class CompanyActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private companyService: CompanyService,
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private tabsService: TabsService,
    private router: Router
  ) { }

  show() {
    this._show = true;
    this.selectedId = 0;
  }

  showDisabled() {
    this.tabsService.create({
      name: '停用公司',
      link: '/admins/company/disabled'
    });
    this.router.navigate(['/admins/company/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.companyService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Company, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.companyService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.companyService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Company, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
