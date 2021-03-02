import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Notes } from '../../models/Notes';
import { NotesService } from '../services/notes.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-noteslist',
  templateUrl: './noteslist.component.html',
  styleUrls: ['./noteslist.component.scss']
})
export class NoteslistComponent implements OnInit {
  @Input() note: Notes;
  @Output() deleteNote: EventEmitter<Notes> = new EventEmitter();
  disabledValue: Boolean;
  description: String;

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.disabledValue = true;
  }

  onSave(){
    console.log(this.note.noteDescription);
    const data = {
      noteDescription: this.note.noteDescription
    }
    this.noteService.updateNote(data, this.note.id).subscribe( note =>
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Note has been updated',
        showConfirmButton: false,
        timer: 1500
      }));
  }

  onDelete(note:Notes){
    console.log(note)
    this.deleteNote.emit(this.note);
  }

}
