import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  constructor(private storageService: LocalStorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.storageService.getJwtToken();
    const isUnauthenticated = token === undefined || token === null || token === '';

    if (!isUnauthenticated) {
      this.router.navigate(['/global']);
    }

    return isUnauthenticated;
  }
}
