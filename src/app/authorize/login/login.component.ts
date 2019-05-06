import { Component, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { LoginRequest } from '../login.request';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '@services/http.service';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';
import { TabsService } from '@components/tabs/tabs.service';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    HttpService,
    AuthorizeService,
    MenuService
  ]
})
export class LoginComponent implements OnInit {

  @SessionStorage()
  private authToken: string;
  @LocalStorage()
  private persistenceAuthToken: string;
  @LocalStorage()
  private cacheCompanyName: string;
  @LocalStorage()
  private cacheUserName: string;

  loginForm: FormGroup;
  alertInfo: string;

  constructor(private builder: FormBuilder,
    private httpService: HttpService,
    private tabService: TabsService,
    private menuService: MenuService,
    private router: Router,
    private authorizeService: AuthorizeService) { }

  errorCallBack(err: any): void {
    this.alertInfo = '登录异常:' + err.statusText;
  }

  loginCallBack(data: any): void {
    this.alertInfo = '登录失败:' + data;
  }

  login(loginRequest: LoginRequest, isValid: boolean): void {
    this.cacheCompanyName = loginRequest.CompanyName;
    this.cacheUserName = loginRequest.LoginName;
    this.authorizeService.login(loginRequest, data => {
      if (data.IsValid) {
        if (loginRequest.RememberMe) {
          this.persistenceAuthToken = data.Token;
        } else {
          this.authToken = data.Token;
        }
        this.tabService.clear();
        this.menuService.initMenus(err => {
          this.alertInfo = '登录失败:' + data;
        });
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
        LoginName: [''],
        Password: [''],
        CompanyName: [''],
        RememberMe: ['']
      }
    );
  }
}
