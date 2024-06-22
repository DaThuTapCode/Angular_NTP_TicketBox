import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionloginService } from '../service/sessionlogin.service'; 

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const sessionLoginService = inject(SessionloginService);

  const isLoggedIn = !!sessionLoginService.getUser();
  const userRole = sessionLoginService.getUserRole();

  if (isLoggedIn) {
    const requiredRole = route.data['role'] as 'ADMIN' | 'USER' | 'MODERATOR';
    if (requiredRole) {
      if (userRole === 'ADMIN' || userRole === 'MODERATOR' || userRole === requiredRole) {
        return true;
      } else if ( requiredRole === 'USER') {
        return true;
      } else {
        return router.createUrlTree(['/not-found']); // Điều hướng đến trang bị cấm nếu quyền truy cập bị từ chối
      }
    }
    return true;
  } else {
    return router.createUrlTree(['/not-found']);
  }
};
