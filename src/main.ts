import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import Quill from 'quill';
import BlotFormatter from '@enzedonline/quill-blot-formatter2';

Quill.register('modules/blotFormatter', BlotFormatter);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
