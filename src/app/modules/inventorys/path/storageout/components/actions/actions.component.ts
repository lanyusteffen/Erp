import { Component, Input } from '@angular/core';
import { StorageOutService } from '../../storageout.service';
import { ConfirmService } from '@services/confirm.service';
import { AlertService, ModuleName } from '@services/alert.service';
import { TabsService } from '@components/tabs/tabs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storageout-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.less']
})

export class StorageOutActionsComponent {
  private _show = false;
  private selectedId: number;

  @Input() selectedItems = <any>[];

  constructor(
    private storageOutService: StorageOutService,
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
      name: '停用出库单',
      link: '/inventorys/storageout/disabled'
    });
	this.router.navigate(['/inventorys/storageout/disabled']);
  }

  close() {
    this._show = false;
  }

  onSearch(queryKey) {
    this.storageOutService.onSearch(queryKey, (err) => {
      this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
    });
  }

  onCancel() {
    this.confirmService.open({
      content: '确认删除吗？',
      onConfirm: () => {
        this.storageOutService
          .cancel(this.selectedItems.map(item => item.Id), data => {
            if (data.IsValid) {
              this.alertService.removeSuccess();
              this.storageOutService.list((err) => {
                this.alertService.listErrorCallBack(ModuleName.StorageOut, err);
              });
            }
          }, (err) => {
            this.alertService.removeFail(err);
          });
      }
    });
  }
}
