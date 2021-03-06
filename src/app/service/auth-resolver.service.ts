import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthResolverService implements Resolve<Observable<any>> {

  constructor(private auth: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    return this.auth.email_confirmation(route.paramMap.get('code'))
      .pipe(
        catchError((err) => {
          return of(err.error);
        })
      );
  }
}
