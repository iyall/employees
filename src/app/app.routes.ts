import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent) },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent), 
        canActivate: [authGuard] 
    },
    {
        path: 'home/detail/:id', loadComponent: () => import('./views/home/detail/detail-employee').then(m => m.DetailEmployeeComponent),
        canActivate: [authGuard]
    },
    {
        path:'home/:id/edit', loadComponent:() => import('./views/home/employee-form/employee-form').then(m=>m.EmployeeFormPage),
        canActivate: [authGuard]
    },
    {
        path:'home/new', loadComponent: () => import('./views/home/employee-form/employee-form').then(m=>m.EmployeeFormPage),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/login' }
];
