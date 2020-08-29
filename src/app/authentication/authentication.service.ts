import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserToken } from './interface';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly USERTOKEN = 'TSCHAT_USER';
  private readonly httpOptions = {};
  constructor(private httpClient: HttpClient, private router: Router) {}

  public login(userName: string, password: string): Observable<UserToken> {
    return this.httpClient
      .post<UserToken>('http://chat-api.teksoft1.com/api/auth/login', {
        userName,
        password,
      })
      .pipe(
        tap((token) => {
          localStorage.setItem(this.USERTOKEN, JSON.stringify(token));
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(this.USERTOKEN);
    this.router.navigate(['home']);
  }

  public loginSilently(): UserToken | null {
    const cachedUser = localStorage.getItem(this.USERTOKEN);
    if (!cachedUser) {
      return null;
    }

    return JSON.parse(cachedUser);
  }

  public isTokenValid(): boolean {
    return !!localStorage.getItem(this.USERTOKEN);
  }
}
