import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { RouteReuseStrategy } from '@angular/router';

import { UIModule } from '../UI/ui.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TabsService } from './components/tabs/tabs.service';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';
import { ErrorService } from './services/error.service';
import { ConfirmService } from './services/confirm.service';

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
import { PurchaseOrderService } from './modules/purchases/path/order/order.service';
import { PurchaseOrderNewComponent } from './modules/purchases/path/order/new/new.component';

import { ProductComponent } from './modules/products/path/product/product.component';
import { ProductDisabledComponent } from './modules/products/path/product/product-disabled.component';
import { SystemUnitComponent } from './modules/products/path/systemunit/systemunit.component';
import { SystemUnitDisabledComponent } from './modules/products/path/systemunit/systemunit-disabled.component';
import { StorageComponent } from './modules/products/path/storage/storage.component';
import { StorageDisabledComponent } from './modules/products/path/storage/storage-disabled.component';
import { ProductService } from './modules/products/path/product/product.service';
import { StorageService } from './modules/products/path/storage/storage.service';
import { SystemUnitService } from './modules/products/path/systemunit/systemunit.service';
import { SystemUnitActionsComponent } from './modules/products/path/systemunit/components/actions/actions.component';
import { SystemUnitControlComponent } from './modules/products/path/systemunit/components/control/control.component';
import { SystemUnitDisabledListComponent } from './modules/products/path/systemunit/components/disabled/disabled.component';
import { SystemUnitListComponent } from './modules/products/path/systemunit/components/list/list.component';
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
import { ProductUnitComponent } from './modules/products/path/product/components/unit/unit.component';

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
    OtherIncomeComponent,
    OtherIncomeListComponent,
    OtherIncomeActionsComponent,
    OtherIncomeControlComponent,
    OtherIncomeDisabledComponent,
    OtherIncomeDisabledListComponent,
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
    PurchaseOrderNewComponent,
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
    ProductUnitComponent,
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
    AppRoutingModule,
    DpDatePickerModule,
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
    PurchaseOrderService,
    ProductService, SystemUnitService, StorageService,

    HttpService, TabsService, AlertService, ConfirmService, ErrorService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
