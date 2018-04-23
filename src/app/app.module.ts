import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

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
import { ErrorService } from './services/error.service';
import { ConfirmService } from './services/confirm.service';

import { HttpExtensionInterceptor } from './interceptors/http.interceptor.extension';
import { rootRoutes } from './router/app.router';
import { HomeComponent } from './modules/home/home.component';
import { IndexComponent } from './modules/home/components/index/index.component';
import { AuthorizeModule } from './authorize/authorize.module';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ContentComponent,
    TabsComponent,
    TabOutletDirective,
    HomeComponent,
    ConfirmComponent,
    IndexComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    UIModule,
    AuthorizeModule,
    RouterModule.forRoot(rootRoutes),
    SlimLoadingBarModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpExtensionInterceptor,
    multi: true
  }, HttpService, TabsService, AlertService, ConfirmService, ErrorService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
