import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Page404 } from './pages/page404/page404';
import { DetailComponent } from './pages/detail-component/detail-component';
import { EditComponent } from './pages/edit-component/edit-component';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'component/create', component: EditComponent },
  { path: 'component/update/:id', component: EditComponent },
  { path: 'component/:id', component: DetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404 },
];
