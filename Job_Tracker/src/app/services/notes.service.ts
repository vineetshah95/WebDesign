import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from '../../models/Notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  getNotes(id):Observable<Notes[]>{
    const url = `http://localhost:3000/trackers/student/jobs/${id}/jobnotes`;
    return this.http.get<Notes[]>(url, this.httpOptions);
  }

  addNote(note: Notes):Observable<Notes>{
    const url = 'http://localhost:3000/trackers/student/jobnotes';
    return this.http.post<Notes>(url, note, this.httpOptions);
  }

  updateNote(note, id):Observable<any>{
    const url = `http://localhost:3000/trackers/student/jobnotes/${id}`;
    return this.http.put(url, note, this.httpOptions);
  }

  deleteNote(note: Notes):Observable<Notes>{
    const url = `http://localhost:3000/trackers/student/jobnotes/${note.id}`;
    return this.http.delete<Notes>(url, this.httpOptions);
  }
}
