import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';
import { AboutMeComponent } from '../about-me/about-me.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
];
