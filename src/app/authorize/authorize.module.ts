import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxWebstorageModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthorizeModule { }
