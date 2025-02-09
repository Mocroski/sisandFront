import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpStatusCode, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, lastValueFrom, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { TokenMethodsUtils } from '../../shared/token-methods';

const TOKEN_HEADER_KEY = 'Authorization';
const BEARER_TOKEN_PREFIX = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing: boolean;
  private refreshTokenSubject: BehaviorSubject<any>;

  constructor(
    private authService: AuthService
  ) {
    this.isRefreshing = false;
    this.refreshTokenSubject = new BehaviorSubject<any>(null);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = TokenMethodsUtils.getToken();
    if (token) {
      request = this.addTokenHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && !request.url.includes('/login') && err.status === HttpStatusCode.Unauthorized) {
          this.refreshToken(request, next);
        }

        return throwError(() => err);
      })
    );
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = TokenMethodsUtils.getRefreshToken();

      if (refreshToken) {
        lastValueFrom(this.authService.refreshToken(refreshToken)).then(response => {
          TokenMethodsUtils.saveToken(response.data.accessToken);
          TokenMethodsUtils.saveRefreshToken(response.data.refreshToken);

          this.refreshTokenSubject.next(response.data.accessToken);

          this.isRefreshing = false;

          return next.handle(this.addTokenHeader(request, response.data.accessToken));
        })
          .catch(err => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => err);
          });
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, BEARER_TOKEN_PREFIX + token) });
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
