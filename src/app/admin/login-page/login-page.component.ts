import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interface';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  message: string;
  constructor(
    public auth: AuthService,
    private router: Router,
    private  route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']){
        this.message = 'Пожалуйста введите данные';
      } else if (params['authFailed']) {
        this.message = 'Сесия изтекла введите данные заново';
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required ]),
      password:  new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  // tslint:disable-next-line:typedef
  submit(){
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };
    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}