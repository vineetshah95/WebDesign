import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ApplicationTrackerComponent } from './pages/application-tracker/application-tracker.component';
import { AppTrackerComponent } from './app-tracker/app-tracker.component';
import { AppTrackerWishlistComponent } from './app-tracker-wishlist/app-tracker-wishlist.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WishlistAreaComponent } from './wishlist-area/wishlist-area.component';
import { PlacardPopupFormComponent } from './placard-popup-form/placard-popup-form.component';
import { PlacardComponent } from './placard/placard.component';
import { AdvisorLayoutComponent } from './layouts/advisor-layout/advisor-layout.component';
import { PlacardService } from './services/placard.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TasklistItemComponent } from './tasklist-item/tasklist-item.component';
import { NotesComponent } from './notes/notes.component';
import { NoteslistComponent } from './noteslist/noteslist.component';
import { WindowComponent } from './window/window.component'
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    DragDropModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DragDropModule,
    AdvisorLayoutComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DragDropModule,
    AdvisorLayoutComponent,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    ScrollingModule,
    MatIconModule,
    RouterModule 
  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ApplicationTrackerComponent,
    AppTrackerComponent,
    AppTrackerWishlistComponent,
    WishlistAreaComponent,
    PlacardPopupFormComponent,
    PlacardComponent,
    AdvisorLayoutComponent,
    ToolbarComponent,
    PopupFormComponent,
    TasksComponent,
    TasklistComponent,
    TasklistItemComponent,
    NotesComponent,
    NoteslistComponent,
    WindowComponent  
  
  ],
  providers: [PlacardService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
