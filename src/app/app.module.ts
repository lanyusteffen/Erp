import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UIModule } from '../UI/ui.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TabOutletDirective } from './directives/outlet.directive';
import { TabsService } from './components/tabs/tabs.service';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { ErrorService } from './services/error.service';
import { ConfirmService } from './services/confirm.service';

import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { HomeComponent } from './modules/home/home.component';


export const ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'basics/supplier',
    loadChildren: './modules/basics/path/supplier/supplier.module#SupplierModule'
  },
  {
    path: 'basics/otherexchangeunit',
    loadChildren: './modules/basics/path/otherexchangeunit/other-exchange-unit.module#OtherExchangeUnitModule'
  },
  {
    path: 'basics/customer',
    loadChildren: './modules/basics/path/customer/customer.module#CustomerModule'
  },
  {
    path: 'finances/incometype',
    loadChildren: './modules/finances/path/incometype/incometype.module#IncomeTypeModule'
  },
  {
    path: 'finances/feetype',
    loadChildren: './modules/finances/path/feetype/feetype.module#FeeTypeModule'
  },
  {
    path: 'finances/funds',
    loadChildren: './modules/finances/path/funds/funds.module#FundsModule'
  },
  {
    path: 'basics/customer/disabled',
    loadChildren: './modules/basics/path/customer/customer-disabled.module#CustomerDisabledModule'
  },
  {
    path: 'basics/supplier/disabled',
    loadChildren: './modules/basics/path/supplier/supplier-disabled.module#SupplierDisabledModule'
  },
  {
    path: 'basics/otherexchangeunit/disabled',
    loadChildren: './modules/basics/path/otherexchangeunit/other-exchange-unit-disabled.module#OtherExchangeUnitDisabledModule'
  },
  {
    path: 'finances/incometype/disabled',
    loadChildren: './modules/finances/path/incometype/incometype-disabled.module#IncomeTypeDisabledModule'
  },
  {
    path: 'finances/feetype/disabled',
    loadChildren: './modules/finances/path/feetype/feetype-disabled.module#FeeTypeDisabledModule'
  },
  {
    path: 'finances/funds/disabled',
    loadChildren: './modules/finances/path/funds/funds-disabled.module#FundsDisabledModule'
  },
  {
    path: 'basics/employee',
    loadChildren: './modules/basics/path/employee/employee.module#EmployeeModule'
  },  
  {
    path: 'basics/employee/disabled',
    loadChildren: './modules/basics/path/employee/employee-disabled.module#EmployeeDisabledModule'
  },
  {
    path: 'basics/department',
    loadChildren: './modules/basics/path/department/department.module#DepartmentModule'
  },
  {
    path: 'basics/department/disabled',
    loadChildren: './modules/basics/path/department/department-disabled.module#DepartmentDisabledModule'
  },
  {
    path: 'basics/area',
    loadChildren: './modules/basics/path/area/area.module#AreaModule'
  },
  {
    path: 'basics/area/disabled',
    loadChildren: './modules/basics/path/area/area-disabled.module#AreaDisabledModule'
  },  
  {
    path: 'products/storage',
    loadChildren: './modules/products/path/storage/storage.module#StorageModule'
  },
  {
    path: 'products/storage/disabled',
    loadChildren: './modules/products/path/storage/storage-disabled.module#StorageDisabledModule'
  },
  {
    path: 'purchase/order/new',
    loadChildren: './modules/purchase/path/order/path/new/new.module#PurchaseOrderNewModule'
  },
  {
    path: 'products/product',
    loadChildren: './modules/products/path/product/product.module#ProductModule'
  },
  {
    path: 'products/product/disabled',
    loadChildren: './modules/products/path/product/product-disabled.module#ProductDisabledModule'
  },
  {
    path: 'products/product/barcode',
    loadChildren: './modules/products/path/product/product-barcode.module#ProductBarcodeModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ContentComponent,
    TabsComponent,
    TabOutletDirective,
    HomeComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    UIModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: LoadingInterceptor,
  //   multi: true
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }, LoadingService, HttpService, TabsService, AlertService, ConfirmService, ErrorService],
  bootstrap: [AppComponent]
})

export class AppModule {



}
