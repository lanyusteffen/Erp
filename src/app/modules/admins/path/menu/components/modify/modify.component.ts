import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../menu.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-menu-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.less'],
  providers: [FormService]
})

export class MenuModifyComponent {
  private modifyForm = new FormGroup({});
  private _show = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  get show() {
    return this._show;
  }

  @Input()
  set show(isShow) {
    this._show = isShow;
  }

  private _menuId: number;

  get menuId() {
    return this._menuId;
  }

  @Input()
  set menuId(menuId) {
    this._menuId = menuId;
    this.refreshList();
  }

  getTitle(): string {
    return '修改菜单';
  }

  refreshList() {
    if (this._show) {
      this.menuService
        .detail(this.menuId, data => {
          this.modifyForm = this.formService.createForm(data);
        }, (err) => {
          this.alertService.listErrorCallBack(ModuleName.Menu, err);
        });
    }
  }

  constructor(
    private menuService: MenuService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.modifyForm.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }, isValid) {
    this.menuService.update(value, data => {
      if (data.IsValid) {
        this.menuService.list((err) => {
          this.alertService.listErrorCallBack(ModuleName.Menu, err);
        }, () => {
          this.onClose.emit();
          this.alertService.modifySuccess();
        });
      } else {
        this.alertService.modifyFail(data.ErrorMessages);
      }
    }, (err) => {
      this.alertService.modifyFail(err);
    });
  }

}


