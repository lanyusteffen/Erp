import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ProductColorActionsComponent } from '../modules/products/path/productcolor/components/actions/actions.component';

@Injectable()
export class AlertService {
  private alert$ = new Subject<any>();
  private alert = null;
  private id = 0;
  private timeout = null;

  constructor() { }

  open(alert) {
    this.alert = alert;
    this.alert$.next(this.alert);

    this.timeout = setTimeout(() => {
      this.close();
    }, 30000);
  }

  close() {
    this.alert = null;
    this.alert$.next(this.alert);

    clearTimeout(this.timeout);
    this.timeout = null;
  }

  get() {
    return this.alert$.asObservable();
  }

  // 业务封装
  addSuccess() {
    this.open(
      {
        type: 'success',
        content: '添加成功！'
      }
    );
  }

  modifySuccess() {
    this.open(
      {
        type: 'success',
        content: '修改成功！'
      }
    );
  }

  removeSuccess() {
    this.open(
      {
        type: 'success',
        content: '删除成功！'
      }
    );
  }

  cancelSuccess() {
    this.open(
      {
        type: 'success',
        content: '停用成功！'
      }
    );
  }

  restoreSuccess() {
    this.open(
      {
        type: 'success',
        content: '还原成功！'
      }
    );
  }

  addFail(err: any) {
    this.open(
      {
        type: 'danger',
        content: '添加失败！' + err
      }
    );
  }

  modifyFail(err: any) {
    this.open(
      {
        type: 'danger',
        content: '修改失败！' + err
      }
    );
  }

  removeFail(err: any) {
    this.open(
      {
        type: 'danger',
        content: '删除失败！' + err
      }
    );
  }

  cancelFail(err: any) {
    this.open(
      {
        type: 'danger',
        content: '停用失败！' + err
      }
    );
  }

  restoreFail(err: any) {
    this.open(
      {
        type: 'danger',
        content: '还原失败！' + err
      }
    );
  }

  systemConfigFail(err: any) {
    this.open({
      type: 'danger',
      content: '获取系统配置失败' + err
    });
  }

  getModuleName(moduleName: ModuleName): string {
    let name = '';
    switch (moduleName) {

      case ModuleName.Cancel:
        name = '停用';
        break;

      case ModuleName.Funds:
        name = '资金账户';
        break;

      case ModuleName.Company:
        name = '公司';
        break;

      case ModuleName.Role:
        name = '角色';
        break;

      case ModuleName.User:
        name = '用户';
        break;

      case ModuleName.Area:
        name = '区域';
        break;

      case ModuleName.Customer:
        name = '客户';
        break;

      case ModuleName.CustomerContact:
        name = '联系人';
        break;

      case ModuleName.Department:
        name = '部门';
        break;

      case ModuleName.Employee:
        name = '职员';
        break;

      case ModuleName.OtherExchangeUnit:
        name = '其他往来单位';
        break;

      case ModuleName.Feetype:
        name = '费用类型';
        break;

      case ModuleName.IncomeType:
        name = '收入类型';
        break;

      case ModuleName.Storage:
        name = '仓库';
        break;

      case ModuleName.Barcode:
        name = '条码';
        break;

      case ModuleName.Product:
        name = '商品';
        break;

      case ModuleName.StorageInit:
        name = '期初';
        break;

      case ModuleName.Extension:
        name = '扩展属性';
        break;

      case ModuleName.SystemUnit:
        name = '系统单位';
        break;

      case ModuleName.OtherIncome:
        name = '其他收入类型';
        break;

      case ModuleName.FundsAccount:
        name = '银行账户';
        break;

      case ModuleName.Purchase:
        name = '采购订单';
        break;

      case ModuleName.ProductColor:
        name = '商品颜色';
        break;

      case ModuleName.ProductSize:
        name = '商品尺寸';
        break;

      case ModuleName.ProductUnit:
        name = '商品单位';
        break;

      case ModuleName.StorageOut:
        name = '出库单';
        break;
    }

    return name;
  }

  listErrorCallBack(moduleName: ModuleName, err: any): void {
    const name = this.getModuleName(moduleName);
    this.open({
      type: 'danger',
      content: '绑定' + name + '列表失败!' + err
    });
  }

  getErrorCallBack(moduleName: ModuleName, err: any): void {
    const name = this.getModuleName(moduleName);
    this.open({
      type: 'danger',
      content: '获取' + name + '数据失败!' + err
    });
  }
}

export enum ModuleName {
  Funds,
  Cancel,
  Company,
  Role,
  User,
  Area,
  Customer,
  CustomerContact,
  Department,
  Employee,
  OtherExchangeUnit,
  Supplier,
  Feetype,
  IncomeType,
  Storage,
  Barcode,
  Product,
  StorageInit,
  Extension,
  SystemUnit,
  OtherIncome,
  FundsAccount,
  Purchase,
  ProductColor,
  ProductSize,
  ProductUnit,
  StorageOut
}
