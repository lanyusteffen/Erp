import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '../UI/ui.module';
import { AppComponent } from './app.component';
import { AppMenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TabsService } from './components/tabs/tabs.service';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';
import { ErrorService } from './services/error.service';
import { ConfirmService } from './services/confirm.service';
import { NavService } from './components/navs/nav.service';

import { HttpExtensionInterceptor } from './interceptors/http.interceptor.extension';
import { AppRoutingModule } from './app.router';
import { HomeComponent } from './modules/home/home.component';
import { IndexComponent } from './modules/home/components/index/index.component';
import { AuthorizeModule } from './authorize/authorize.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from './shared.module';
import { SimpleReuseStrategy } from '@strategies/SimpleReuseStrategy';
import { OtherIncomeComponent } from './modules/finances/path/otherincome/otherincome.component';
import { OtherIncomeDisabledComponent } from './modules/finances/path/otherincome/otherincome-disabled.component';
import { FeeTypeComponent } from './modules/finances/path/feetype/feetype.component';
import { FeeTypeDisabledComponent } from './modules/finances/path/feetype/feetype-disabled.component';
import { FundsAccountDisabledComponent } from './modules/finances/path/fundsaccount/fundsaccount-disabled.component';
import { FundsAccountComponent } from './modules/finances/path/fundsaccount/fundsaccount.component';
import { OtherIncomeListComponent } from './modules/finances/path/otherincome/components/list/list.component';
import { OtherIncomeActionsComponent } from './modules/finances/path/otherincome/components/actions/actions.component';
import { OtherIncomeDisabledListComponent } from './modules/finances/path/otherincome/components/disabled/disabled.component';
import { FeeTypeListComponent } from './modules/finances/path/feetype/components/list/list.component';
import { FeeTypeActionsComponent } from './modules/finances/path/feetype/components/actions/actions.component';
import { OtherIncomeControlComponent } from './modules/finances/path/otherincome/components/control/control.component';
import { FeeTypeControlComponent } from './modules/finances/path/feetype/components/control/control.component';
import { FeeTypeDisabledListComponent } from './modules/finances/path/feetype/components/disabled/disabled.component';
import { FundsAccountListComponent } from './modules/finances/path/fundsaccount/components/list/list.component';
import { FundsAccountActionsComponent } from './modules/finances/path/fundsaccount/components/actions/actions.component';
import { FundsAccountControlComponent } from './modules/finances/path/fundsaccount/components/control/control.component';
import { FundsAccountDisabledListComponent } from './modules/finances/path/fundsaccount/components/disabled/disabled.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FundsAccountService } from './modules/finances/path/fundsaccount/fundsaccount.service';
import { FeeTypeService } from './modules/finances/path/feetype/feetype.service';
import { OtherIncomeService } from './modules/finances/path/otherincome/otherincome.service';
import { AreaComponent } from './modules/basics/path/area/area.component';
import { AreaListComponent } from './modules/basics/path/area/components/list/list.component';
import { AreaControlComponent } from './modules/basics/path/area/components/control/control.component';
import { AreaActionsComponent } from './modules/basics/path/area/components/actions/actions.component';
import { AreaDisabledComponent } from './modules/basics/path/area/area-disabled.component';
import { AreaDisabledListComponent } from './modules/basics/path/area/components/disabled/disabled.component';
import { CustomerComponent } from './modules/basics/path/customer/customer.component';
import { CustomerDisabledComponent } from './modules/basics/path/customer/customer-disabled.component';
import { CustomerListComponent } from './modules/basics/path/customer/components/list/list.component';
import { CustomerControlComponent } from './modules/basics/path/customer/components/control/control.component';
import { CustomerActionsComponent } from './modules/basics/path/customer/components/actions/actions.component';
import { CustomerDisabledListComponent } from './modules/basics/path/customer/components/disabled/disabled.component';
import { DepartmentComponent } from './modules/basics/path/department/department.component';
import { DepartmentDisabledComponent } from './modules/basics/path/department/department-disabled.component';
import { DepartmentActionsComponent } from './modules/basics/path/department/components/actions/actions.component';
import { DepartmentListComponent } from './modules/basics/path/department/components/list/list.component';
import { DepartmentControlComponent } from './modules/basics/path/department/components/control/control.component';
import { DepartmentDisabledListComponent } from './modules/basics/path/department/components/disabled/disabled.component';
import { EmployeeComponent } from './modules/basics/path/employee/employee.component';
import { EmployeeListComponent } from './modules/basics/path/employee/components/list/list.component';
import { EmployeeActionsComponent } from './modules/basics/path/employee/components/actions/actions.component';
import { EmployeeControlComponent } from './modules/basics/path/employee/components/control/control.component';
import { EmployeeDisabledComponent } from './modules/basics/path/employee/employee-disabled.component';
import { EmployeeDisabledListComponent } from './modules/basics/path/employee/components/disabled/disabled.component';
import { SupplierComponent } from './modules/basics/path/supplier/supplier.component';
import { SupplierListComponent } from './modules/basics/path/supplier/components/list/list.component';
import { SupplierActionsComponent } from './modules/basics/path/supplier/components/actions/actions.component';
import { SupplierControlComponent } from './modules/basics/path/supplier/components/control/control.component';
import { SupplierDisabledComponent } from './modules/basics/path/supplier/supplier-disabled.component';
import { SupplierDisabledListComponent } from './modules/basics/path/supplier/components/disabled/disabled.component';
import { AreaService } from './modules/basics/path/area/area.service';
import { CustomerService } from './modules/basics/path/customer/customer.service';
import { DepartmentService } from './modules/basics/path/department/department.service';
import { EmployeeService } from './modules/basics/path/employee/employee.service';
import { OtherExchangeUnitService } from './modules/basics/path/otherexchangeunit/other-exchange-unit.service';
import { SupplierService } from './modules/basics/path/supplier/supplier.service';
import { BasicsSharedModule } from './modules/basics/components/basics.shared.module';
import { ProductsSharedModule } from './modules/products/components/products.shared.module';
import { CompanyComponent } from './modules/admins/path/company/company.component';
import { CompanyListComponent } from './modules/admins/path/company/components/list/list.component';
import { CompanyActionsComponent } from './modules/admins/path/company/components/actions/actions.component';
import { CompanyControlComponent } from './modules/admins/path/company/components/control/control.component';
import { CompanyDisabledComponent } from './modules/admins/path/company/company-disabled.component';
import { CompanyDisabledListComponent } from './modules/admins/path/company/components/disabled/disabled.component';
import { UserComponent } from './modules/admins/path/user/user.component';
import { UserListComponent } from './modules/admins/path/user/components/list/list.component';
import { UserActionsComponent } from './modules/admins/path/user/components/actions/actions.component';
import { UserControlComponent } from './modules/admins/path/user/components/control/control.component';
import { UserDisabledComponent } from './modules/admins/path/user/user-disabled.component';
import { UserDisabledListComponent } from './modules/admins/path/user/components/disabled/disabled.component';
import { RoleComponent } from './modules/admins/path/role/role.component';
import { RoleListComponent } from './modules/admins/path/role/components/list/list.component';
import { RoleActionsComponent } from './modules/admins/path/role/components/actions/actions.component';
import { RoleControlComponent } from './modules/admins/path/role/components/control/control.component';
import { RoleDisabledComponent } from './modules/admins/path/role/role-disabled.component';
import { RoleDisabledListComponent } from './modules/admins/path/role/components/disabled/disabled.component';
import { SystemConfigComponent } from './modules/admins/path/systemconfig/systemconfig.component';
import { SystemConfigControlComponent } from './modules/admins/path/systemconfig/components/control/control.component';
import { SystemConfigService } from './modules/admins/path/systemconfig/systemconfig.service';
import { CompanyService } from './modules/admins/path/company/company.service';
import { UserService } from './modules/admins/path/user/user.service';
import { RoleService } from './modules/admins/path/role/role.service';
import { UserModifyComponent } from './modules/admins/path/user/components/modify/modify.component';
import { UserPasswordComponent } from './modules/admins/path/user/components/password/password.component';
import { DpDatePickerModule, DatePickerComponent } from 'ng2-date-picker';

import { PurchaseService } from './modules/purchases/path/order/order.service';
import { PurchaseNewComponent } from './modules/purchases/path/order/new/new.component';
import { PurchaseHistoryComponent } from './modules/purchases/path/order/history/history.component';
import { PurchaseActionsComponent } from './modules/purchases/path/order/history/actions/actions.component';
import { PurchaseListComponent } from './modules/purchases/path/order/history/list/list.component';

import { ProductComponent } from './modules/products/path/product/product.component';
import { ProductDisabledComponent } from './modules/products/path/product/product-disabled.component';
import { StorageComponent } from './modules/products/path/storage/storage.component';
import { StorageDisabledComponent } from './modules/products/path/storage/storage-disabled.component';
import { ProductService } from './modules/products/path/product/product.service';
import { StorageService } from './modules/products/path/storage/storage.service';
import { SystemUnitService } from './modules/products/path/systemunit/systemunit.service';
import { ProductActionsComponent } from './modules/products/path/product/components/actions/actions.component';
import { ProductBarcodeComponent } from './modules/products/path/product/product-barcode.component';
import { ProductBarcodeListComponent } from './modules/products/path/product/components/barcode/barcode.component';
import { ProductDisabledListComponent } from './modules/products/path/product/components/disabled/disabled.component';
import { ProductExtensionComponent } from './modules/products/path/product/components/extension/extension.component';
import { ProductListComponent } from './modules/products/path/product/components/list/list.component';
import { ProductStorageInitComponent } from './modules/products/path/product/components/storageInit/storageInit.component';
import { StorageActionsComponent } from './modules/products/path/storage/components/actions/actions.component';
import { StorageControlComponent } from './modules/products/path/storage/components/control/control.component';
import { StorageDisabledListComponent } from './modules/products/path/storage/components/disabled/disabled.component';
import { StorageListComponent } from './modules/products/path/storage/components/list/list.component';
import { UnitComponent } from './modules/products/path/product/components/unit/unit.component';

import { ProductColorComponent } from './modules/products/path/productcolor/productcolor.component';
import { ProductColorListComponent } from './modules/products/path/productcolor/components/list/list.component';
import { ProductColorControlComponent } from './modules/products/path/productcolor/components/control/control.component';
import { ProductColorActionsComponent } from './modules/products/path/productcolor/components/actions/actions.component';
import { ProductColorDisabledComponent } from './modules/products/path/productcolor/productcolor-disabled.component';
import { ProductColorDisabledListComponent } from './modules/products/path/productcolor/components/disabled/disabled.component';

import { ProductSizeComponent } from './modules/products/path/productsize/productsize.component';
import { ProductSizeListComponent } from './modules/products/path/productsize/components/list/list.component';
import { ProductSizeControlComponent } from './modules/products/path/productsize/components/control/control.component';
import { ProductSizeActionsComponent } from './modules/products/path/productsize/components/actions/actions.component';
import { ProductSizeDisabledComponent } from './modules/products/path/productsize/productsize-disabled.component';
import { ProductSizeDisabledListComponent } from './modules/products/path/productsize/components/disabled/disabled.component';

import { ProductUnitComponent } from './modules/products/path/productunit/productunit.component';
import { ProductUnitListComponent } from './modules/products/path/productunit/components/list/list.component';
import { ProductUnitControlComponent } from './modules/products/path/productunit/components/control/control.component';
import { ProductUnitActionsComponent } from './modules/products/path/productunit/components/actions/actions.component';
import { ProductUnitDisabledComponent } from './modules/products/path/productunit/productunit-disabled.component';
import { ProductUnitDisabledListComponent } from './modules/products/path/productunit/components/disabled/disabled.component';

import { SystemUnitComponent } from './modules/products/path/systemunit/systemunit.component';
import { SystemUnitListComponent } from './modules/products/path/systemunit/components/list/list.component';
import { SystemUnitControlComponent } from './modules/products/path/systemunit/components/control/control.component';
import { SystemUnitActionsComponent } from './modules/products/path/systemunit/components/actions/actions.component';
import { SystemUnitDisabledComponent } from './modules/products/path/systemunit/systemunit-disabled.component';
import { SystemUnitDisabledListComponent } from './modules/products/path/systemunit/components/disabled/disabled.component';

import { ProductConfigComponent } from './modules/products/path/productconfig/productconfig.component';
import { ProductConfigControlComponent } from './modules/products/path/productconfig/components/control/control.component';

import { ProductColorService } from './modules/products/path/productcolor/productcolor.service';
import { ProductSizeService } from './modules/products/path/productsize/productsize.service';
import { ProductUnitService } from './modules/products/path/productunit/productunit.service';
import { ProductConfigService } from './modules/products/path/productconfig/productconfig.service';

import { ProductControlComponent } from './modules/products/path/product/components/control/control.component';

import { StorageOutNewComponent } from './modules/inventorys/path/storageout/new/new.component';
import { StorageOutService } from './modules/inventorys/path/storageout/storageout.service';
import { StorageOutHistoryComponent } from './modules/inventorys/path/storageout/history/history.component';
import { StorageOutActionsComponent } from './modules/inventorys/path/storageout/history/actions/actions.component';
import { StorageOutListComponent } from './modules/inventorys/path/storageout/history/list/list.component';
import { InventorysSharedModule } from './modules/inventorys/components/inventorys.shared.module';

import { MenuListComponent } from './modules/admins/path/menu/components/list/list.component';
import { MenuActionsComponent } from './modules/admins/path/menu/components/actions/actions.component';
import { MenuControlComponent } from './modules/admins/path/menu/components/control/control.component';
import { MenuDisabledListComponent  } from './modules/admins/path/menu/components/disabled/disabled.component';
import { MenuDisabledComponent } from './modules/admins/path/menu/menu-disabled.component';
import { MenuComponent } from './modules/admins/path/menu/menu.component';
import { MenuService } from './modules/admins/path/menu/menu.service';
import { AdminsSharedModule } from './modules/admins/components/admins.shared.module';
import { OtherExchangeUnitComponent } from './modules/basics/path/otherexchangeunit/other-exchange-unit.component';
import { OtherExchangeUnitListComponent } from './modules/basics/path/otherexchangeunit/components/list/list.component';
import { OtherExchangeUnitActionsComponent } from './modules/basics/path/otherexchangeunit/components/actions/actions.component';
import { OtherExchangeUnitControlComponent } from './modules/basics/path/otherexchangeunit/components/control/control.component';
import { OtherExchangeUnitDisabledComponent } from './modules/basics/path/otherexchangeunit/other-exchange-unit-disabled.component';
import { OtherExchangeUnitDisabledListComponent } from './modules/basics/path/otherexchangeunit/components/disabled/disabled.component';
import { PermissionService } from './modules/admins/path/permission/permission.service';
import { PermissionActionsComponent } from './modules/admins/path/permission/components/actions/actions.component';
import { PermissionComponent } from './modules/admins/path/permission/permission.component';
import { PermissionControlComponent } from './modules/admins/path/permission/components/control/control.component';
import { PermissionDisabledListComponent } from './modules/admins/path/permission/components/disabled/disabled.component';
import { PermissionListComponent } from './modules/admins/path/permission/components/list/list.component';
import { PermissionDisabledComponent } from './modules/admins/path/permission/permission-disabled.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ContentComponent,
    TabsComponent,
    HomeComponent,
    ConfirmComponent,
    IndexComponent,
    PageNotFoundComponent,
    OtherIncomeComponent,
    OtherIncomeDisabledComponent,
    FeeTypeComponent,
    FeeTypeDisabledComponent,
    FundsAccountComponent,
    FundsAccountDisabledComponent,
    OtherIncomeListComponent,
    OtherIncomeActionsComponent,
    OtherIncomeControlComponent,
    OtherIncomeDisabledListComponent,
    FeeTypeListComponent,
    FeeTypeActionsComponent,
    FeeTypeControlComponent,
    FeeTypeDisabledListComponent,
    FundsAccountListComponent,
    FundsAccountActionsComponent,
    FundsAccountControlComponent,
    FundsAccountDisabledListComponent,
    AreaComponent,
    AreaListComponent,
    AreaActionsComponent,
    AreaControlComponent,
    AreaDisabledComponent,
    AreaDisabledListComponent,
    CustomerComponent,
    CustomerListComponent,
    CustomerActionsComponent,
    CustomerControlComponent,
    CustomerDisabledComponent,
    CustomerDisabledListComponent,
    DepartmentComponent,
    DepartmentListComponent,
    DepartmentActionsComponent,
    DepartmentControlComponent,
    DepartmentDisabledComponent,
    DepartmentDisabledListComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeActionsComponent,
    EmployeeControlComponent,
    EmployeeDisabledComponent,
    EmployeeDisabledListComponent,
    OtherExchangeUnitComponent,
    OtherExchangeUnitListComponent,
    OtherExchangeUnitActionsComponent,
    OtherExchangeUnitControlComponent,
    OtherExchangeUnitDisabledComponent,
    OtherExchangeUnitDisabledListComponent,
    SupplierComponent,
    SupplierListComponent,
    SupplierActionsComponent,
    SupplierControlComponent,
    SupplierDisabledComponent,
    SupplierDisabledListComponent,
    CompanyComponent,
    CompanyListComponent,
    CompanyActionsComponent,
    CompanyControlComponent,
    CompanyDisabledComponent,
    CompanyDisabledListComponent,
    UserComponent,
    UserListComponent,
    UserActionsComponent,
    UserControlComponent,
    UserDisabledComponent,
    UserDisabledListComponent,
    UserModifyComponent,
    UserPasswordComponent,
    RoleComponent,
    RoleListComponent,
    RoleActionsComponent,
    RoleControlComponent,
    RoleDisabledComponent,
    RoleDisabledListComponent,
    SystemConfigComponent,
    SystemConfigControlComponent,
    SystemUnitComponent,
    SystemUnitDisabledComponent,
    SystemUnitActionsComponent,
    SystemUnitControlComponent,
    SystemUnitDisabledListComponent,
    SystemUnitListComponent,
    ProductActionsComponent,
    ProductBarcodeComponent,
    ProductBarcodeListComponent,
    ProductComponent,
    ProductDisabledComponent,
    ProductDisabledListComponent,
    ProductExtensionComponent,
    ProductListComponent,
    ProductStorageInitComponent,
    StorageActionsComponent,
    StorageComponent,
    StorageControlComponent,
    StorageDisabledComponent,
    StorageDisabledListComponent,
    StorageListComponent,
    UnitComponent,
    ProductBarcodeListComponent,
    ProductColorComponent,
    ProductColorListComponent,

    ProductColorControlComponent,
    ProductColorActionsComponent,
    ProductColorDisabledComponent,
    ProductColorDisabledListComponent,

    ProductSizeComponent,
    ProductSizeListComponent,
    ProductSizeControlComponent,
    ProductSizeActionsComponent,
    ProductSizeDisabledComponent,
    ProductSizeDisabledListComponent,

    ProductUnitComponent,
    ProductUnitListComponent,
    ProductUnitControlComponent,
    ProductUnitActionsComponent,
    ProductUnitDisabledComponent,
    ProductUnitDisabledListComponent,

    ProductConfigComponent,
    ProductConfigControlComponent,
    ProductControlComponent,

    PurchaseNewComponent,
    PurchaseHistoryComponent,
    PurchaseActionsComponent,
    PurchaseListComponent,

    StorageOutNewComponent,
    StorageOutHistoryComponent,
    StorageOutActionsComponent,
    StorageOutListComponent,

    MenuActionsComponent,
    MenuComponent,
    MenuControlComponent,
    MenuDisabledListComponent,
    MenuListComponent,
    MenuDisabledComponent,

    PermissionActionsComponent,
    PermissionComponent,
    PermissionControlComponent,
    PermissionDisabledListComponent,
    PermissionListComponent,
    PermissionDisabledComponent,

    AppMenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    AuthorizeModule,
    SharedModule,
    BasicsSharedModule,
    InventorysSharedModule,
    ProductsSharedModule,
    AppRoutingModule,
    DpDatePickerModule,
    AdminsSharedModule,
    SlimLoadingBarModule.forRoot()
  ],
  entryComponents: [
    DatePickerComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpExtensionInterceptor,
    multi: true
  },
  { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },

    FundsAccountService, OtherIncomeService, FeeTypeService,
    SystemConfigService, CompanyService, UserService, RoleService,
    AreaService, CustomerService, DepartmentService, EmployeeService, OtherExchangeUnitService, SupplierService,
    PurchaseService,
    ProductService, SystemUnitService, StorageService,
    ProductColorService, ProductSizeService, ProductUnitService, ProductConfigService,
    HttpService, TabsService, NavService, AlertService, ConfirmService, ErrorService, AuthGuard, AuthService,
    MenuService, StorageOutService, PermissionService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
