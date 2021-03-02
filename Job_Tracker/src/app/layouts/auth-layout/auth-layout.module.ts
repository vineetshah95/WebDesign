import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { PagesModule } from '../../pages/pages.module';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    PagesModule,
    Ng2TelInputModule
  ],
  declarations: [
  ]
})
export class AuthLayoutModule { }
