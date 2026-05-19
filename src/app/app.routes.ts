import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Page404 } from './pages/page404/page404';
import { DetailComponent } from './pages/detail-component/detail-component';
import { EditComponent } from './pages/edit-component/edit-component';
import { userGuard } from './guards/user-guard';
import { supplierGuard } from './guards/supplier-guard';

export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [userGuard] },
  { path: 'login', component: Login },
  { path: 'component/create', component: EditComponent, canActivate: [supplierGuard] },
  { path: 'component/update/:id', component: EditComponent, canActivate: [supplierGuard] },
  { path: 'component/:id', component: DetailComponent, canActivate: [userGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404 },
];
