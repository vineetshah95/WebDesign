import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdvisorLayoutRoutes } from './advisor-layout.routing';
import { AdvisorDashboardComponent } from '../../pages/advisor-dashboard/advisor-dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from '../../pages/pages.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdvisorLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    PagesModule
  ],
  declarations: [
    AdvisorDashboardComponent,
    UserProfileComponent
  ]
})

export class AdvisorLayoutModule {}
