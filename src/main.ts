/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localefr from '@angular/common/locales/fr';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
registerLocaleData(localefr, 'fr');
