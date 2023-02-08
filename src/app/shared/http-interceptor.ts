import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let options = {};

    const token = this.authService.getToken();
    if (token != null) {
      options = { headers: req.headers.set('Authorization', token) };
    }

    return next.handle(req.clone(options))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/auth']);
          }
          else if (error.status !== 404) {
            this.message.create('error', 'Ocorreu um erro ao executar a operação');
          }

          return throwError(() => error);
        })
      );
  }
}
