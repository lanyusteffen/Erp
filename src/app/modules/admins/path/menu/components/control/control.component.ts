import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MenuService } from '../../menu.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';
import { MenuSelectorComponent } from '../../../../components/menu-selector/menu-selector.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

const ExcludeCompany = {
  MenuId: 0,
  CompanyId: 0,
  CompanyName: null
};

@Component({
  selector: 'app-menu-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class MenuControlComponent {

  private form = new FormGroup({});
  private _show = false;

  @ViewChild('menuSelector')
  private menuSelector: MenuSelectorComponent;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }

  @Input() type = 'create';

  private _menuId: number;

  get menuId() {
    return this._menuId;
  }

  @Input()
  set menuId(menuId) {
    this._menuId = menuId;
    this.loadingBar.start();
    this.refreshList();
  }

  getTitle(): string {
    if (this.type === 'create') {
      return '添加菜单';
    } else {
      return '修改菜单';
    }
  }

  refreshList() {
    if (this._show) {
      if (this.type === 'create') {
        this.menuService
          .newOne(data => {
            this.form = this.formService.createForm(data);
            this.loadingBar.complete();
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
            this.loadingBar.complete();
          });
      } else {
        this.menuService
          .detail(this.menuId, data => {
            this.form = this.formService.createForm(data);
            this.loadingBar.complete();
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
            this.loadingBar.complete();
          });
      }
    }
  }

  constructor(
    private menuService: MenuService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private loadingBar: SlimLoadingBarService
  ) {
  }

  get excludeCompanyList(): FormArray { return this.form.get('ExcludeCompanyList') as FormArray; }
  get formReady(): boolean { return !!Object.keys(this.form.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }, isValid) {
    if (!isValid) {
      return;
    }
    this.loadingBar.start();
    if (this.type === 'create') {
      this.menuService.create(value, data => {
        if (data.IsValid) {
          this.menuService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
          }, () => {
            this.refreshList();
            this.menuSelector.reBind();
            this.onClose.emit();
            this.loadingBar.complete();
            this.alertService.addSuccess();
          });
        } else {
          this.alertService.addFail(data.ErrorMessages);
          this.loadingBar.complete();
        }
      }, (err) => {
        this.alertService.addFail(err);
        this.loadingBar.complete();
      });
    } else {
      this.menuService.update(value, data => {
        if (data.IsValid) {
          this.menuService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
          }, () => {
            this.refreshList();
            this.menuSelector.reBind();
            this.onClose.emit();
            this.loadingBar.complete();
            this.alertService.modifySuccess();
          });
        } else {
          this.alertService.modifyFail(data.ErrorMessages);
          this.loadingBar.complete();
        }
      }, (err) => {
        this.alertService.modifyFail(err);
        this.loadingBar.complete();
      });
    }
  }

  addCompany(idx) {
    const ctrlArray = <FormArray>this.form.controls['ExcludeCompanyList'];
    ctrlArray.insert(idx + 1, this.fb.group(ExcludeCompany));
  }

  removeCompany(idx) {
    const ctrlArray = <FormArray>this.form.controls['ExcludeCompanyList'];
    ctrlArray.removeAt(idx);
  }

  selectCompanyChanged(item, idx) {
    const ctrlArray = <FormArray>this.form.controls['ExcludeCompanyList'];
    const eachListControls = <FormGroup>ctrlArray.controls[idx];
    eachListControls.controls['CompanyName'].setValue(item.label);
  }
}


