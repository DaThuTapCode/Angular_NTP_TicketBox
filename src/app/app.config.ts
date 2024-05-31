import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { demoInterceptor } from './interceptors/interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

// Đăng ký locale tiếng Việt
registerLocaleData(localeVi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    provideHttpClient(withInterceptors([demoInterceptor])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'vi' } // Cấu hình locale tiếng Việt
  ],
};
