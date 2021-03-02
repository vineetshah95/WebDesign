import { Component, OnInit } from '@angular/core';
import { Notes } from '../../models/Notes';
import { NotesService } from '../services/notes.service';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Notes[];
  // noteDescription: String;

  constructor(private notesService: NotesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.notes = this.notesService.getNotes();
    }

  ngOnInit(): void {
    this.notesService.getNotes(this.data.id).subscribe(notes => {
      this.notes = notes;
    });
  }

  SubmitNote(){
    let description = document.querySelector('textarea').value;
    const notes = {
      jobId: this.data.id,
      noteDescription: description
    }
    this.addNotes(notes);
  }

  addNotes(note){
    this.notesService.addNote(note).subscribe(note => {
      this.notes.push(note);
    });
  }

  deleteNote(note: Notes){
    console.log(note)
    this.notes = this.notes.filter(n => n.id !== note.id);
    this.notesService.deleteNote(note).subscribe();
  }

}
