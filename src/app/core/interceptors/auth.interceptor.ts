import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpEvent
} from '@angular/common/http';
import {BehaviorSubject,
  catchError,
  filter, finalize, Observable, of,
  switchMap, take, } from 'rxjs';
import {AuthService} from "../services";
import {CookieService} from "../services/cookie.service";




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  static addTokenRequest(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return request;
  }

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  | any
  {
    const accessToken = this.cookieService.getCookie('token');  //accesTokenit ar inaxavdi cookieshi magitom ar atanda tokens
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 401:
            return this.handle401Error(request, next);
        }
        const error = err.error.message || err.statusText;
        return error;
      })
    );
  }

  handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authService
        .refreshToken(this.authService.getRefreshToken() || '')
        .pipe(
          switchMap((token: any) => {
            if (token) {
              this.tokenSubject.next(token.accessToken);
              return next.handle(
                AuthInterceptor.addTokenRequest(request, token.accessToken)
              );
            }
            this.authService.logout();
            return of(false);
          }),
          catchError((err) => {
            this.authService.logout();
            return of(false);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(AuthInterceptor.addTokenRequest(request, token));
        }),
        catchError((err) => {
          this.authService.logout();
          return of(false);
        })
      );
    }
  }
}

