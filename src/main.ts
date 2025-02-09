import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { authInterceptorProviders } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserModule),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    authInterceptorProviders
    
  ]
}).catch(err => console.error(err));
