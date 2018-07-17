import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { IndexComponent } from './modules/home/components/index/index.component';
import { LoginComponent } from './authorize/login/login.component';
import { PurchaseOrderNewComponent } from './modules/purchases/path/order/new/new.component';
import { PopupSelectorSupplierComponent } from './modules/basics/components/popup-selector-supplier/popup-selector-supplier.component';
import { PopupSelectorOtherComponent } from './modules/basics/components/popup-selector-other/popup-selector-other.component';
import { PopupSelectorCustomerComponent } from './modules/basics/components/popup-selector-customer/popup-selector-customer.component';

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
                canLoad: [AuthGuard],
                component: IndexComponent
              },
              {
                path: 'basics/supplier',
                loadChildren: './modules/basics/path/supplier/supplier.module#SupplierModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/otherexchangeunit',
                loadChildren: './modules/basics/path/otherexchangeunit/other-exchange-unit.module#OtherExchangeUnitModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/customer',
                loadChildren: './modules/basics/path/customer/customer.module#CustomerModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/incometype',
                loadChildren: './modules/finances/path/incometype/incometype.module#IncomeTypeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/feetype',
                loadChildren: './modules/finances/path/feetype/feetype.module#FeeTypeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/funds',
                loadChildren: './modules/finances/path/funds/funds.module#FundsModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/employee',
                loadChildren: './modules/basics/path/employee/employee.module#EmployeeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/department',
                loadChildren: './modules/basics/path/department/department.module#DepartmentModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/area',
                loadChildren: './modules/basics/path/area/area.module#AreaModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/storage',
                loadChildren: './modules/products/path/storage/storage.module#StorageModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'purchases/order/new',
                component: PurchaseOrderNewComponent,
                canLoad: [AuthGuard]
              },
              {
                path: 'products/product',
                loadChildren: './modules/products/path/product/product.module#ProductModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/product/barcode',
                loadChildren: './modules/products/path/product/product-barcode.module#ProductBarcodeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/company',
                loadChildren: './modules/admins/path/company/company.module#CompanyModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/user',
                loadChildren: './modules/admins/path/user/user.module#UserModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/role',
                loadChildren: './modules/admins/path/role/role.module#RoleModule',
                canLoad: [AuthGuard]
              }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
