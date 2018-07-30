import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { IndexComponent } from './modules/home/components/index/index.component';
import { LoginComponent } from './authorize/login/login.component';

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
              },
              {
                path: 'basics/area',
                loadChildren: './modules/basics/path/area/area.module#AreaModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/customer',
                loadChildren: './modules/basics/path/customer/customer.module#CustomerModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/department',
                loadChildren: './modules/basics/path/department/department.module#DepartmentModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/employee',
                loadChildren: './modules/basics/path/employee/employee.module#EmployeeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/otherexchangeunit',
                loadChildren: './modules/basics/path/otherexchangeunit/other-exchange-unit.module#OtherExchangeUnitModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'basics/supplier',
                loadChildren: './modules/basics/path/supplier/supplier.module#SupplierModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/otherincome',
                loadChildren: './modules/finances/path/otherincome/otherincome.module#OtherIncomeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/feetype',
                loadChildren: './modules/finances/path/feetype/feetype.module#FeeTypeModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'finances/fundsaccount',
                loadChildren: './modules/finances/path/fundsaccount/fundsaccount.module#FundsAccountModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/storage',
                loadChildren: './modules/products/path/storage/storage.module#StorageModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'products/product',
                loadChildren: './modules/products/path/product/product.module#ProductModule',
                canLoad: [AuthGuard]
              },
              {
                path: 'purchases/order',
                loadChildren: './modules/purchases/path/order/order.module#PurchaseOrderModule',
                canLoad: [AuthGuard]
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
