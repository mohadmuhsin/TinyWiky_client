
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class adminGuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   const token = localStorage.getItem('tok');
    
    const loginRoute = '/admin/auth';

    if ((state.url !== loginRoute ) && token === null) {
      this.router.navigate(['/admin/auth']);
      return false;
    } else if ((state.url === loginRoute ) && token !== null) {
      this.router.navigate(['/charts'])
      return false
    }
    
    return true;
  }
};

