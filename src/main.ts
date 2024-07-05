import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AuthInterceptor } from './app/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-dan42zmue7a65nbf.us.auth0.com',
      clientId: '3g4JsP8cndDYiM6Hygdv84wgdYeBqq8Z',
      authorizationParams: {
        audience: 'http://localhost:5042/api',
        redirect_uri: window.location.origin
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:5042/api/*',
          }
        ]
      }
    }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
}).catch(err => console.error(err));
