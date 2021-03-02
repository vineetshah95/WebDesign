import { Injectable } from '@angular/core';
import { Job } from '../../models/job';

@Injectable({
  providedIn: 'root'
})
export class ShareIDService {
  jobData: Job
  constructor() { }
  
  setJob(job){
    this.jobData = job;
  }

  getJob(){
    return this.jobData;
  }
}
