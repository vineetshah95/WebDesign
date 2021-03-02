import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvisorNavbarComponent } from './advisor-navbar/advisor-navbar.component';
import { AboutMeComponent } from '../layouts/about-me/about-me.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    AdvisorNavbarComponent,
    AboutMeComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    AdvisorNavbarComponent
  ]
})
export class ComponentsModule { }
