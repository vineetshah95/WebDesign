import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { AdvisorDashboardComponent } from '../../pages/advisor-dashboard/advisor-dashboard.component';
import { ChangePasswordAdvisorComponent } from '../../pages/change-password-advisor/change-password-advisor.component';
import { UserProfileAdvisorComponent } from '../../pages/user-profile-advisor/user-profile-advisor.component';
import { AboutMeComponent } from '../about-me/about-me.component';

export const AdvisorLayoutRoutes: Routes = [
    { path: 'advisor',   component: AdvisorDashboardComponent },
    { path: 'user-profile-advisor',   component: UserProfileAdvisorComponent },
    { path: 'change-password-advisor',   component: ChangePasswordAdvisorComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'logout',          component: LoginComponent }
];
