import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class NbInterceptor implements HttpInterceptor {

  token;

  constructor(private authService : NbAuthService, private router: Router){
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => this.token = token);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.headers.get('noauth')) {
      return next.handle(req.clone());
    } else {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      });
      return next.handle(clonedreq).pipe(
        tap(
          event => { },
          err => {
            if (err.error.auth == false) {
              this.router.navigateByUrl('/login');
            }
          })
      );
    }
  }
}
