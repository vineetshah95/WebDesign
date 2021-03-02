import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Job } from '../../models/job';
import { ShareIDService } from '../services/share-id.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  job: Job;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // console.log(this.getJob());
  }

  // getJob():Job{
  //   return this.data;
  // }

}
