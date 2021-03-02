import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef, MAT_DIALOG_DATA} from'@angular/material/dialog';
import { Job } from '../../models/job';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
//Service
import {PlacardService} from './../services/placard.service'; 
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-placard-popup-form',
  templateUrl: './placard-popup-form.component.html',
  styleUrls: ['./placard-popup-form.component.scss']
})

export class PlacardPopupFormComponent implements OnInit {
  //Variables
  formField: MatFormField;
  buttonModule: MatButtonModule;
   notesParent: Array<Job> = [];
  @Input() job: Job;
  @Output() newNoteEmitted = new EventEmitter<any>();
  
jobTitle: string;
companyName: string;
jobStatus: string;

  constructor(private placardService: PlacardService,
    private dialogRef: MatDialogRef<PlacardPopupFormComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: Job, private router: Router) {
    
     }

  ngOnInit(): void {
  
  }
 
/**
 * On submit button this method helps in registering the job in database
 * and sending back the UI
 */
  createPlacard(){
   
    let obj = {
      jobTitle: this.jobTitle,
      companyName: this.companyName,
      jobStatus: this.jobStatus
    }
    

    this.placardService.createPlacard(obj).subscribe(
      (data) => {
             
        this.jobStatus = data.jobStatus;
        this.companyName = data.companyName;
        this.jobTitle = data.jobTitle;
        this.router.navigate(['application_tracker']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Job added successfully!',
          showConfirmButton: false,
          timer: 800
        
        })
        window.location.reload();
      },

      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error in registering!'
      })          
    );
  



}
//For closing the pop up form 
  onCrossClick(){
    this.dialogRef.close();
  }

 

}
