import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../menu.service';
import { FormService } from '@services/form.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { AlertService, ModuleName } from '@services/alert.service';

@Component({
  selector: 'app-menu-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less'],
  providers: [FormService]
})

export class MenuControlComponent {
  private controlForm = new FormGroup({});
  private _show = false;
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
            this.controlForm = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
          });
      } else {
        this.menuService
          .detail(this.menuId, data => {
            this.controlForm = this.formService.createForm(data);
          }, (err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
          });
      }
    }
  }

  constructor(
    private menuService: MenuService,
    private formService: FormService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  get formReady(): boolean { return !!Object.keys(this.controlForm.controls).length; }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit({ value }) {

    if (this.type === 'create') {
      this.menuService.create(value, data => {
        if (data.IsValid) {
          this.menuService.list((err) => {
            this.alertService.listErrorCallBack(ModuleName.Menu, err);
          }, () => {
            this.onClose.emit();
            this.alertService.addSuccess();
          });
        } else {
          this.alertService.addFail(data.ErrorMessages);
        }
      }, (err) => {
        this.alertService.addFail(err);
      });
    } else {
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
}


