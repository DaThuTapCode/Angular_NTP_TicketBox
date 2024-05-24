import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  // Sử dụng inject để lấy TokenService
  const tokenService = inject(TokenService);
  const authToken = tokenService.getToken();

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
