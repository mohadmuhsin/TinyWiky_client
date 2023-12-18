import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { MainServicesService } from './services/main-services.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private service :MainServicesService){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('tok');
    
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.refreshTokenSubject.value) {
      this.refreshTokenSubject.next(null);
      let newToken!:any;
      this.service.refreshToken().subscribe({
        next:(res:any)=>{
          localStorage.setItem('tok',res.accessToken);
          newToken = res.accessToken
        },error:(err)=>{
          console.log(err);
        }
      })

      this.refreshTokenSubject.next(newToken);

      return next.handle(this.addToken(request, newToken));
    }


    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => next.handle(this.addToken(request, this.refreshTokenSubject.value)))
    );
  }
}
