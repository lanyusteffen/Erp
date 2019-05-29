import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-permission-disabled',
  template: `
  <div class="actions">
    <app-quick-search [placeholder]="'输入编号、名称查询'" (onSearch)="onSearchDisabled($event)"></app-quick-search>
    <app-ui-button [style]="'danger'" [disabled]="!selectedItems.length" (click)="restore()">
        <i class="iconfont icon-delete"></i>
        还原
    </app-ui-button>
    <app-ui-button *ngIf="!systemConfig.IsOpenBill" [style]="'danger'" [disabled]="!selectedItems.length" (click)="delete()">
        <i class="iconfont icon-delete"></i>
        删除
    </app-ui-button>
    <div class="more">
    </div>
  </div>
  <div class="content">
    <app-permission-disabled-list (selectItems)="selectItems($event)"></app-permission-disabled-list>
  </div>
  `,
  styles: [`
  :host {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
  }
`],
  providers: [
    AppService
  ]
})
export class PermissionDisabledComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
