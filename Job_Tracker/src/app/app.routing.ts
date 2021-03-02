import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdvisorLayoutComponent } from './layouts/advisor-layout/advisor-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdvisorDashboardComponent } from './pages/advisor-dashboard/advisor-dashboard.component';
import { ApplicationTrackerComponent } from './pages/application-tracker/application-tracker.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AboutMeComponent } from './layouts/about-me/about-me.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UserProfileAdvisorComponent } from './pages/user-profile-advisor/user-profile-advisor.component';
import { ChangePasswordAdvisorComponent } from './pages/change-password-advisor/change-password-advisor.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'application_tracker',
    component: AdminLayoutComponent,
    children: [
      {
        path: '**',
        component: ApplicationTrackerComponent
      }
     
    ]
  },
  {
    path: 'user-profile',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: UserProfileComponent
      }
    ]
  },
  {
    path: 'change-password',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: 'logout',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'logout',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'forgot-password',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
  },
  {
    path: 'advisor',
    component: AdvisorLayoutComponent,
    children: [
      {
        path: '',
        component: AdvisorDashboardComponent
      }
    ]
  },
  {
    path: 'user-profile-advisor',
    component: AdvisorLayoutComponent,
    children: [
      {
        path: '',
        component: UserProfileAdvisorComponent
      }
    ]
  },
  {
    path: 'change-password-advisor',
    component: AdvisorLayoutComponent,
    children: [
      {
        path: '',
        component: ChangePasswordAdvisorComponent
      }
    ]
  },
  
  { 
    path: '', 
    component: PopupFormComponent,
    outlet: 'navbar'  
  },
  { path: 'job-tasks', 
    component: TasksComponent,
    outlet: 'navbar'
  },
  { path: 'job-notes', 
    component: NotesComponent,
    outlet: 'navbar'
  },
  { 
    path: 'job-info', 
    component: PopupFormComponent,
    outlet: 'navbar'  
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
