import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import{PlacardService} from './../../services/placard.service';
import {Job } from '../../../models/job';

@Component({
  selector: 'app-application-tracker',
  templateUrl: './application-tracker.component.html',
  styleUrls: ['./application-tracker.component.scss']
})
export class ApplicationTrackerComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {
  }

  
}
