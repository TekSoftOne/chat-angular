import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  loading = false;
  error: any;
  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
      this.auth
        .login(form.controls.email.value, form.controls.password.value)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.loading = false;
            this.error = err.error ?? err.message;
            return throwError(err);
          }),
          tap(() => this.router.navigateByUrl('dashboard')),
          tap(() => (this.loading = false))
        )
        .subscribe();
    } else {
      return;
    }
  }
}
