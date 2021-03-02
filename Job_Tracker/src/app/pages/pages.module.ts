import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdvisorDashboardComponent } from './advisor-dashboard/advisor-dashboard.component';
import { ChangePasswordAdvisorComponent } from './change-password-advisor/change-password-advisor.component';
import { UserProfileAdvisorComponent } from './user-profile-advisor/user-profile-advisor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    Ng2TelInputModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    AdvisorDashboardComponent,
    ChangePasswordAdvisorComponent,
    UserProfileAdvisorComponent
  ],
  exports: [
    Ng2TelInputModule,
    UserProfileComponent
  ],
  providers: [Ng2TelInputModule],
})
export class PagesModule { }
