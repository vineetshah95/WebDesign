import { Component, OnInit, Input } from '@angular/core';
import { JobInfoService } from '../services/job-info.service';
import { JobInfo } from '../../models/JobInfo';
import { WindowComponent } from '../window/window.component';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Job } from '../../models/job';
import { componentFactoryName } from '@angular/compiler';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent implements OnInit {
  jobs:JobInfo[];
  jobData: Job;
  Resume;
  CoverLetter;
  FileArray:File[] = new Array(2);

  viewRumeFile:File = null;
  constructor(private jobInfoService:JobInfoService, @Inject(MAT_DIALOG_DATA) public data: Job) { }

  ngOnInit(): void {
    this.jobInfoService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  onFileSelected(event){
    this.Resume = event.target.files[0];
    this.FileArray[0]=this.Resume;
  }

  onCLSelected(event){
    this.CoverLetter = event.target.files[0];
    // console.log(this.CoverLetter);
    this.FileArray[1]=this.CoverLetter;
  }

  onSubmit(){
    if(document.querySelector('input').value==""){
      alert('Please enter Company Name');
    }else{
    if(this.FileArray[0]==this.CoverLetter && this.FileArray[1]==this.Resume){
      this.FileArray[0] = this.Resume;
      this.FileArray[1] = this.CoverLetter;
    }

    console.log(this.FileArray);

    let InputFields = document.getElementsByTagName('input');
    console.log(InputFields);
    console.log(InputFields[0].value);
    this.jobData = {
      id: this.data.id,
      jobStatus: this.data.jobStatus,
      companyName: InputFields[0].value,
      jobTitle: InputFields[1].value,
      jobDescription: document.getElementsByTagName('textarea')[0].value,
      appliedDate: new Date(InputFields[4].value),
      interviewDate1: new Date(InputFields[5].value),
      interviewDate2: new Date(InputFields[6].value),
      offerDate: new Date(InputFields[7].value),
      salary: parseInt(InputFields[8].value),
      location: InputFields[9].value,
      jobResume: "",
      jobCoverLetter: "",
      fileArray: this.FileArray
    }
    //form data
    let body = new FormData();
    body.append("companyName", InputFields[0].value);
    body.append("jobTitle", InputFields[1].value);
    body.append("jobDescription", document.getElementsByTagName('textarea')[0].value);
    body.append("appliedDate", InputFields[4].value);
    body.append("interviewDate1", InputFields[5].value);
    body.append("interviewDate2", InputFields[6].value);
    body.append("offerDate", InputFields[7].value);
    body.append("salary", InputFields[8].value);
    body.append("location", InputFields[9].value);
    
    var send = [];
    send.push(this.FileArray[0]);
    send.push(this.FileArray[1]);
    console.log(typeof(this.FileArray[0]));

    const objT = {};
    objT["companyName"] = InputFields[0].value;
    objT["jobTitle"] = InputFields[1].value;
    objT["jobDescription"] = document.getElementsByTagName('textarea')[0].value;
    objT["appliedDate"] = InputFields[4].value;
    objT["interviewDate1"] = InputFields[5].value;
    objT["interviewDate2"] = InputFields[6].value;
    objT["offerDate"] = InputFields[7].value;
    objT["salary"] = InputFields[8].value;
    objT["location"] = InputFields[9].value;
    
    if(typeof(this.FileArray[0]) != 'undefined' || this.FileArray[0] != null){
      objT["uploadType"] = "resume";
      body.append("uploadType", "resume");
      body.append("documentImages", this.FileArray[0]);
    }

    console.log(this.data.id)

    var url = new URL('http://localhost:3000/trackers/student/jobs/'+this.data.id);
    
    Object.keys(objT).forEach(key => url.searchParams.append(key, objT[key]));

    this.data=this.jobData;
    this.updateJobInfo(url, body, this.data.id);
    console.log(this.Resume);
    console.log(this.CoverLetter);
    location.reload();
    timeout(20);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  }

  updateJobInfo(url, body, id){
    this.jobInfoService.putJobs(url, body, id).subscribe( id => 
      this.Resume = id["jobResume"]);
  }

  viewResume(){
    var viewResume = document.getElementById("viewResume");
    
    var url = 'http://localhost:3000/trackers/student/jobs/'+this.data.id;
    this.jobInfoService.getJobsView(url).subscribe(jobs => {
      console.log("Outside");
      console.log();
      if(jobs.data.jobResume!=undefined || jobs.data.jobResume!=null){
        this.viewRumeFile = jobs.data.jobResume;
      
        viewResume.setAttribute("target", "_blank");
        viewResume.setAttribute("href", this.viewRumeFile.toString());
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Resume not uploaded!'
        })
  
      }
    });
    console.log(this.Resume);   
  }

}