import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {HrComponent} from './features/hr/hr.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'HR', component: HrComponent },
];
