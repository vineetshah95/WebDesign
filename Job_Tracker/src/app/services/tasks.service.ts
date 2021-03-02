import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tasks } from '../../models/Tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksUrl:string = 'http://localhost:3000/trackers/student/jobs/';

  constructor( private http:HttpClient ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  
  getTasks(id):Observable<Tasks[]>{
    const newUrl = `http://localhost:3000/trackers/student/jobs/${id}/jobtasks`;
    return this.http.get<Tasks[]>(newUrl, this.httpOptions);
 }

 addTask(task:Tasks):Observable<any>{
   let url = 'http://localhost:3000/trackers/student/jobtasks';
   return this.http.post(url, task, this.httpOptions);
 }

 deleteTask(task:Tasks):Observable<any>{
   console.log(task.id);
   const url = `http://localhost:3000/trackers/student/jobtasks/${task.id}`;
   return this.http.delete<any>(url, this.httpOptions);
 }

 toggleCompleted(task: Tasks):Observable<any>{
   const url = `http://localhost:3000/trackers/student/jobtasks/${task.id}`;
   return this.http.put(url, task, this.httpOptions);
 }

 updateTasks(task, id):Observable<any>{
  const url = `http://localhost:3000/trackers/student/jobtasks/${id}`;
  return this.http.put(url, task, this.httpOptions);
 }

}
