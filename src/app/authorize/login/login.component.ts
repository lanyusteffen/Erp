import { Component, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { LoginRequest } from '../login.request';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService, ModuleType } from '../../services/http.service';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert.service';
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
  private authToken: String;
  @LocalStorage()
  private persistenceAuthToken: String;

  loginForm: FormGroup;
  submitted: boolean;

  constructor(private builder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private alertService: AlertService,
    private authorizeService: AuthorizeService) { }

  errorCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '获取登录信息失败!' + err
    });
  }

  loginCallBack(err: any): void {
    this.alertService.open({
      type: 'danger',
      content: '登录失败' + err
    });
  }


  login(loginRequest: LoginRequest, isValid: boolean) {

    this.authorizeService.login(loginRequest, data => {
      if (data.Token !== '') {
        this.submitted = true;
        this.authToken = data.Token;
        this.alertService.open({
          type: 'success',
          content: '登录成功'
        });
        this.router.navigate(['/home/index']);
      } else {
        this.loginCallBack(data.err);
      }
    }, (err) => {
      this.loginCallBack(err);
    });
  }

  ngOnInit() {
    this.loginForm = this.builder.group(
      {
        userName: [''],
        password: [''],
        companyName: ['']
      }
    );
  }
}
