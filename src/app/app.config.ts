import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { demoInterceptor } from './interceptors/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    provideHttpClient(withInterceptors([demoInterceptor]))
  ],
};
