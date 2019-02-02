import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { IndexComponent } from './modules/home/components/index/index.component';
import { LoginComponent } from './authorize/login/login.component';
import { OtherIncomeComponent } from './modules/finances/path/otherincome/otherincome.component';
import { OtherIncomeDisabledComponent } from './modules/finances/path/otherincome/otherincome-disabled.component';
import { FundsAccountComponent } from './modules/finances/path/fundsaccount/fundsaccount.component';
import { FundsAccountDisabledComponent } from './modules/finances/path/fundsaccount/fundsaccount-disabled.component';
import { FeeTypeComponent } from './modules/finances/path/feetype/feetype.component';
import { FeeTypeDisabledComponent } from './modules/finances/path/feetype/feetype-disabled.component';
import { AreaComponent } from './modules/basics/path/area/area.component';
import { AreaDisabledComponent } from './modules/basics/path/area/area-disabled.component';
import { CustomerComponent } from './modules/basics/path/customer/customer.component';
import { CustomerDisabledComponent } from './modules/basics/path/customer/customer-disabled.component';
import { DepartmentComponent } from './modules/basics/path/department/department.component';
import { DepartmentDisabledComponent } from './modules/basics/path/department/department-disabled.component';
import { EmployeeComponent } from './modules/basics/path/employee/employee.component';
import { EmployeeDisabledComponent } from './modules/basics/path/employee/employee-disabled.component';
import { SupplierDisabledComponent } from './modules/basics/path/supplier/supplier-disabled.component';
import { SupplierComponent } from './modules/basics/path/supplier/supplier.component';
import { CompanyComponent } from './modules/admins/path/company/company.component';
import { CompanyDisabledComponent } from './modules/admins/path/company/company-disabled.component';
import { UserComponent } from './modules/admins/path/user/user.component';
import { UserDisabledComponent } from './modules/admins/path/user/user-disabled.component';
import { RoleDisabledComponent } from './modules/admins/path/role/role-disabled.component';
import { RoleComponent } from './modules/admins/path/role/role.component';
import { SystemConfigComponent } from './modules/admins/path/systemconfig/systemconfig.component';
import { PurchaseNewComponent } from './modules/purchases/path/order/new/new.component';
import { ProductComponent } from './modules/products/path/product/product.component';
import { ProductBarcodeComponent } from './modules/products/path/product/product-barcode.component';
import { ProductDisabledComponent } from './modules/products/path/product/product-disabled.component';
import { StorageComponent } from './modules/products/path/storage/storage.component';
import { StorageDisabledComponent } from './modules/products/path/storage/storage-disabled.component';
import { SystemUnitComponent } from './modules/products/path/systemunit/systemunit.component';
import { SystemUnitDisabledComponent } from './modules/products/path/systemunit/systemunit-disabled.component';
import { ProductUnitComponent } from './modules/products/path/productunit/productunit.component';
import { ProductUnitDisabledComponent } from './modules/products/path/productunit/productunit-disabled.component';
import { ProductColorComponent } from './modules/products/path/productcolor/productcolor.component';
import { ProductColorDisabledComponent } from './modules/products/path/productcolor/productcolor-disabled.component';
import { ProductSizeComponent } from './modules/products/path/productsize/productsize.component';
import { ProductSizeDisabledComponent } from './modules/products/path/productsize/productsize-disabled.component';
import { ProductConfigComponent } from './modules/products/path/productconfig/productconfig.component';
import { StorageOutNewComponent } from './modules/inventorys/path/storageout/new/new.component';
import { PurchaseHistoryComponent } from './modules/purchases/path/order/history/history.component';
import { StorageOutHistoryComponent } from './modules/inventorys/path/storageout/history/history.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: AppComponent,
        pathMatch: 'full'
    },
    {
        path: 'authorize/login',
        component: LoginComponent
    },
    {
        path: '',
        canActivate: [
            AuthGuard
        ],
        component: HomeComponent,
        children: [
              {
                path: 'home/index',
                canActivate: [AuthGuard],
                component: IndexComponent
              },
              {
                path: 'admins/company',
                component: CompanyComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'admins/company/disabled',
                component: CompanyDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'admins/user',
                component: UserComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'admins/user/disabled',
                component: UserDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'admins/role',
                component: RoleComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'admins/role/disabled',
                component: RoleDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'admins/systemconfig',
                component: SystemConfigComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/area',
                component: AreaComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/area/disabled',
                component: AreaDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/customer',
                component: CustomerComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/customer/disabled',
                component: CustomerDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/department',
                component: DepartmentComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/department/disabled',
                component: DepartmentDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/employee',
                component: EmployeeComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/employee/disabled',
                component: EmployeeDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/otherexchangeunit',
                component: OtherIncomeComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/otherexchangeunit/disabled',
                component: OtherIncomeDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/supplier',
                component: SupplierComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'basics/supplier/disabled',
                component: SupplierDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'finances/otherincome',
                component: OtherIncomeComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'finances/otherincome/disabled',
                component: OtherIncomeDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'finances/feetype',
                component: FeeTypeComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'finances/feetype/disabled',
                component: FeeTypeDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'finances/fundsaccount',
                component: FundsAccountComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'finances/fundsaccount/disabled',
                component: FundsAccountDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/storage',
                component: StorageComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/storage/disabled',
                component: StorageDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/systemunit',
                component: SystemUnitComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/systemunit/disabled',
                component: SystemUnitDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productconfig',
                component: ProductConfigComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productcolor',
                component: ProductColorComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productcolor/disabled',
                component: ProductColorDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productsize',
                component: ProductSizeComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productsize/disabled',
                component: ProductSizeDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productunit',
                component: ProductUnitComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/productunit/disabled',
                component: ProductUnitDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/product',
                component: ProductComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/product/disabled',
                component: ProductDisabledComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'products/product/barcode',
                component: ProductBarcodeComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'purchases/order',
                component: PurchaseNewComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'inventorys/storageout',
                component: StorageOutNewComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'inventorys/storageout/history',
                component: StorageOutHistoryComponent,
                canActivate: [AuthGuard]
              },
              {
                path: 'purchases/order/history',
                component: PurchaseHistoryComponent,
                canActivate: [AuthGuard]
              },
              { path: '**', component: PageNotFoundComponent }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
