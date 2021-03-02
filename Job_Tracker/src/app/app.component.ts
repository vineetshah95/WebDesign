import { Component, NgZone } from '@angular/core';
import {Job} from '../models/job';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  notesParent: Array<Job> = [];

}
