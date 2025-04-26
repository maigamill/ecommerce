import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { headerInterceptor } from '../interceptors/header.interceptor';
import { errorsInterceptor } from '../interceptors/errors.interceptor';



export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withViewTransitions()),
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorsInterceptor])),
    provideAnimations(),
    provideToastr(),
   
    ]
};
