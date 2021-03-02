import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../../models/job';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()
export class PlacardService {
  placardResource: string;
  placardResourceURL: string;

  constructor(private http: HttpClient) {
    this.placardResource = 'trackers/student/jobs';
    this.placardResourceURL = `${environment.serverBaseURL}/${this.placardResource}`;
   }

   /**
    * 
    * @param obj 
    * @return Observable<any>
    * Utility method to post the job into the database
    */
   postJob(obj): Observable<any>{
      let jobMsg = this.http.post(
      this.placardResourceURL,
        obj,
        this.httpOptions);
    return jobMsg;
}

/**
    * 
    * @param obj 
    * @return Observable<any>
    * Utility method to retrieve the jobs from the database
    */
getJobs(): Observable<any>{
  let jobMsg = this.http.get(this.placardResourceURL, this.httpOptions);
  return jobMsg;
}

/**
    * 
    * @param id 
    * 
    * @return Observable<any>
    * Utility method to delete the job from the database
    */
deleteJob(id): Observable<any>{
   let jobMsg = this.http.delete(`${this.placardResourceURL}/${id}`
   ,this.httpOptions);
   return jobMsg;
}

/**
    * 
    * @param obj
    * @param id 
    * @return Observable<any>
    * Utility method to post the job into the database
    */
updateStatus(id, job): Observable<any>{
let jobMsg = this.http.put(`${this.placardResourceURL}/${id}`
,job, this.httpOptions);
console.log(jobMsg);
console.log('jobMsg above');
  return jobMsg;
}


/**
 * Setting the httpHeader to pass the header with request
 */
   private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // to allow cookies to go from "https://localhost:4567" to "http://localhost:5678"
};

/**
 * 
 * @param placard 
 * @return Observable<any>
 * creates the job in the datbase
 */
   createPlacard(placard): Observable<any>{
     
    let newPlacard: Job;
    const temp = this.postJob(placard);
    return temp;
  }

/**
 * To get all the jobs from the database
 * @return Observable<any>
 */
  getPlacards(): Observable<any>{
   const temp = this.getJobs();
   return temp;
   
 }
 /**
  * 
  * @param id 
  * Deletes the job from the database
  * @return Observable<any>
  */

 deletePlacard(id: Number): Observable<any>{
const temp = this.deleteJob(id);
return temp;
 }

 /**
  * 
  * @param job 
  * Updates the status of the job in the database
  * @return Observable<any>
  */

 updatePlacardJobStatus(job: Job): Observable<any>{
   console.log(job);
     const temp = this.updateStatus(job.id, job);
     return temp;
 }

 /**
  * 
  * @param id 
  * @return Observable<job>
  * Geta specific placard with that id
  */
 getPlacard(id: Number): Observable<Job>{
   return this.http.get<Job>(
    `${this.placardResourceURL}/${id}`,
    this.httpOptions
   )
 }
 

}
