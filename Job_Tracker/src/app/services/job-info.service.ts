import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobInfo } from '../../models/JobInfo';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobInfoService {
  jobInfoUrl: string = 'http://localhost:3000/trackers/student/jobs';

  constructor(private http:HttpClient) { }

  getJobs():Observable<JobInfo[]>{
    return this.http.get<JobInfo[]>(this.jobInfoUrl, this.httpOptions);
  }

  getJobsView(url):Observable<any>{
    let job = this.http.get(url, this.httpOptions);
    console.log(job);
    return job;
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // to allow cookies to go from "https://localhost:4567" to "http://localhost:5678"
  };

  private httpOptionsForm = {
    withCredentials: true // to allow cookies to go from "https://localhost:4567" to "http://localhost:5678"
  };

  putJobs(url, body, id):Observable<any>{
    console.log("Inside JOb Update Service")
    console.log(decodeURI(url));
    let data =  this.http.put(decodeURI(url), body, this.httpOptionsForm);
    console.log("Put Jobs Data");
    console.log(data);
    
    return data;
  }
}
