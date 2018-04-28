import { Component, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { LoginRequest } from '../login.request';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService, ModuleType } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    HttpService,
    AuthorizeService,
  ]
})
export class LoginComponent implements OnInit {

  @SessionStorage()
  private authToken: string;
  @LocalStorage()
  private persistenceAuthToken: string;
  @SessionStorage()
  private cacheCompanyName: string;
  @SessionStorage()
  private cacheUserName: string;

  loginForm: FormGroup;
  alertInfo: string;

  constructor(private builder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authorizeService: AuthorizeService) { }

  errorCallBack(err: any): void {
    this.alertInfo = '登录异常:' + err.statusText;
  }

  loginCallBack(data: any): void {
    this.alertInfo = '登录失败:' + data.ErrorMessages;
  }

  login(loginRequest: LoginRequest, isValid: boolean): void {
    this.cacheCompanyName = loginRequest.CompanyName;
    this.cacheUserName = loginRequest.UserName;
    console.log(this.cacheCompanyName);
    this.authorizeService.login(loginRequest, data => {
      if (data.IsValid) {
        if (loginRequest.RememberMe) {
          this.persistenceAuthToken = data.Token;
        } else {
          this.authToken = data.Token;
        }
        this.router.navigate(['/home/index']);
      } else {
        this.loginCallBack(data.ErrorMessages);
      }
    }, (err) => {
      this.errorCallBack(err);
    });
  }

  ngOnInit() {
    this.loginForm = this.builder.group(
      {
        UserName: [''],
        Password: [''],
        CompanyName: [''],
        RememberMe: ['']
      }
    );
  }
}
