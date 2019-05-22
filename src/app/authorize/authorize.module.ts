import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {Ng2Webstorage} from 'ngx-webstorage';

@NgModule({
  imports: [
    CommonModule,
    Ng2Webstorage.forRoot(),
    ReactiveFormsModule,
    Ng2Webstorage
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthorizeModule { }
