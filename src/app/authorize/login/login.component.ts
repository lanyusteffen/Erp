import { Component, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { LoginRequest } from '../login.request';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpService, ModuleType } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    HttpService
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
              private router: Router) { }

  login(loginRequest: LoginRequest, isValid: boolean) {
    this.submitted = true;
    this.authToken = '122213133213';
    this.router.navigate(['/home/index']);
   /*  this.httpService.post('/api/user/login', loginRequest, (data) => {
      if (data) {
        this.router.navigate(['/home/index']);
      }
    }, (err) => {
      console.log('登录异常');
    }, ModuleType.Admin); */
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
