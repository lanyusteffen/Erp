import { Component, Input } from '@angular/core';
import { OperationService } from '../../operation.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class OperationActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private operationService: OperationService,
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
      name: '停用用户',
      link: '/admins/operation/disabled'
    });
	this.router.navigate(['/admins/operation/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.operationService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.Operation, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.operationService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.operationService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.Operation, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
