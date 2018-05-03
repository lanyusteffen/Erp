import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { PageNotFoundComponent } from '../page-not-found.component';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../modules/home/home.component';
import { IndexComponent } from '../modules/home/components/index/index.component';
import { LoginComponent } from '../authorize/login/login.component';

export const rootRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'authorize/login',
        component: LoginComponent
    },
    {
        path: 'home',
        canActivate: [
            AuthGuard
        ],
        component: HomeComponent,
        children: [
              {
                path: 'index',
                canLoad: [ AuthGuard],
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
                path: 'basics/customer/disabled',
                loadChildren: './modules/basics/path/customer/customer-disabled.module#CustomerDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/supplier/disabled',
                loadChildren: './modules/basics/path/supplier/supplier-disabled.module#SupplierDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/otherexchangeunit/disabled',
                loadChildren: './modules/basics/path/otherexchangeunit/other-exchange-unit-disabled.module#OtherExchangeUnitDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/incometype/disabled',
                loadChildren: './modules/finances/path/incometype/incometype-disabled.module#IncomeTypeDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/feetype/disabled',
                loadChildren: './modules/finances/path/feetype/feetype-disabled.module#FeeTypeDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/funds/disabled',
                loadChildren: './modules/finances/path/funds/funds-disabled.module#FundsDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/employee',
                loadChildren: './modules/basics/path/employee/employee.module#EmployeeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/employee/disabled',
                loadChildren: './modules/basics/path/employee/employee-disabled.module#EmployeeDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/department',
                loadChildren: './modules/basics/path/department/department.module#DepartmentModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/department/disabled',
                loadChildren: './modules/basics/path/department/department-disabled.module#DepartmentDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/area',
                loadChildren: './modules/basics/path/area/area.module#AreaModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/area/disabled',
                loadChildren: './modules/basics/path/area/area-disabled.module#AreaDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/storage',
                loadChildren: './modules/products/path/storage/storage.module#StorageModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/storage/disabled',
                loadChildren: './modules/products/path/storage/storage-disabled.module#StorageDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'purchase/order/new',
                loadChildren: './modules/purchase/path/order/path/new/new.module#PurchaseOrderNewModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/product',
                loadChildren: './modules/products/path/product/product.module#ProductModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/product/disabled',
                loadChildren: './modules/products/path/product/product-disabled.module#ProductDisabledModule',
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
                path: 'admins/company/disabled',
                loadChildren: './modules/admins/path/company/company-disabled.module#CompanyDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/user',
                loadChildren: './modules/admins/path/user/user.module#UserModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/user/disabled',
                loadChildren: './modules/admins/path/user/user-disabled.module#UserDisabledModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/role',
                loadChildren: './modules/admins/path/role/role.module#RoleModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'admins/role/disabled',
                loadChildren: './modules/admins/path/role/role-disabled.module#RoleDisabledModule',
                canLoad: [AuthGuard]
              }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
