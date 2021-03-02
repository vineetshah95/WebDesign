
import {Job} from '../../models/job'
import { InvokeFunctionExpr } from '@angular/compiler';
//Drag and drop API
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { PlacardPopupFormComponent } from '../placard-popup-form/placard-popup-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
//Service
import {PlacardService} from './../services/placard.service'
//Observable
import {Observable} from 'rxjs';


export interface DialogData {
  jobTitle: string;
  companyName: string;
  jobStatus: string;
}

@Component({
  selector: 'app-app-tracker',
  templateUrl: './app-tracker.component.html',
  styleUrls: ['./app-tracker.component.scss']
})
export class AppTrackerComponent implements OnInit {
 
 //Variables
job: Job;
numbers: Job[] = [];
notesParent: Array<Job> = [];
appliedNumbers: Job[] = [];
interviewNumbers: Job[] = [];
offeredNumbers: Job[] = [];
rejectedNumbers: Job[] = [];
placardService: PlacardService;
jobTitle: String;
companyName: String;
jobStatus: string;

//Event emitter which catches the emitted deleteNote event
@Output() newDeleteEmitted = new EventEmitter();
 
   constructor(public dialog: MatDialog, placardService: PlacardService){
     this.placardService = placardService;
  
   }

   //On initialization the array which handles the placards get initialized
   ngOnInit(): void {
     let placards$: Observable<any> = this.placardService.getPlacards();
     placards$.subscribe(placards => {
     this.numbers = placards;
      for(let j of this.numbers){
             this.companyName = j.companyName;
             this.jobTitle = j.jobTitle;
    
              if(j.jobStatus.includes("wishlist")){
                   this.notesParent.push(j);
                   } 
              
              else if(j.jobStatus.includes("applied")){
                    this.appliedNumbers.push(j);
                    }
     
              else if(j.jobStatus.includes("interview")){
                    this.interviewNumbers.push(j);
                    }
     
              else if(j.jobStatus.includes("offered")){
                    this.offeredNumbers.push(j);
                    }
     
              else if(j.jobStatus.includes("rejected")){
                    this.rejectedNumbers.push(j);
                    }
     
                  }
     
                                          })
                   }
 
/**
 * 
 * @param event 
 * of type CDKDragDrop taking Array of Jobs
 * Handles the drop of the placards
 */
  drop(event: CdkDragDrop<Job[]>){
    if(event.previousContainer != event.container){
    
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
   
  /**
   * If the placard is dropped into a different section
   * below piece of code updates the status of the job
   *  */  
    for(let j of event.container.data){
          if(event.container.id === "cdk-drop-list-0"){
          
            j.jobStatus = "wishlist"
              this.updatePlacardJobStatus(j);
          }

          else if(event.container.id === "cdk-drop-list-1"){
          
            j.jobStatus = "applied"
              this.updatePlacardJobStatus(j);
          }

          else if(event.container.id === "cdk-drop-list-2"){
           
            j.jobStatus = "interview"
              this.updatePlacardJobStatus(j);
          }

          else if(event.container.id === "cdk-drop-list-3"){
            
            j.jobStatus = "offered"
              this.updatePlacardJobStatus(j);
          }

          else if(event.container.id === "cdk-drop-list-4"){
           
            j.jobStatus = "rejected"
              this.updatePlacardJobStatus(j);
          }
    }


    }

    /**This will help in moving the placard within the section */
    else{
    moveItemInArray (this.notesParent, event.previousIndex, event.currentIndex);
    moveItemInArray (this.appliedNumbers, event.previousIndex, event.currentIndex);
    moveItemInArray (this.interviewNumbers, event.previousIndex, event.currentIndex);
    moveItemInArray (this.offeredNumbers, event.previousIndex, event.currentIndex);
    moveItemInArray (this.rejectedNumbers, event.previousIndex, event.currentIndex);
  }
  }

  /**
   * Popping up the form to fill in the placard details
   * Using the MatDialog popup form
   */
  popupPlacardForm(){

    const dialogRef = this.dialog.open(PlacardPopupFormComponent, {
      width: '250px',
      data: {jobTitle: this.jobTitle,
      jobStatus: this.jobStatus,
    companyName: this.companyName}
    });
    dialogRef.disableClose=true;
     
    dialogRef.afterClosed().subscribe(result => {
    
    })
  
  }
  /**
   * 
   * @param job 
   * Removes the job from the section
   * Triggers.
   * Fetches the jobs and place them in the container
   */

  removeNote(job: Job){
      let notes$: Observable<any> = this.placardService.getPlacards();
      notes$.subscribe( notes => {
      this.cleanup();
    
      for(let j of notes){
      if(j.jobStatus.includes("wishlist")){
        this.notesParent.push(j);
      } 
      
      else if(j.jobStatus.includes("applied")){
        this.appliedNumbers.push(j);
      }
    
      else if(j.jobStatus.includes("interview")){
        this.interviewNumbers.push(j);
      }
    
      else if(j.jobStatus.includes("offered")){
        this.offeredNumbers.push(j);
      }
    
      else if(j.jobStatus.includes("rejected")){
        this.rejectedNumbers.push(j);
      }

    }
    
  });
 
  }

  /**
   * 
   * @param job 
   * Adding the note into the database
   */
  addNote(job: Job){
    console.log(job);
    console.log('addnot, do I get called');
    
  }

  /**
   * Utility code to clean up the arrays before updating
   */
  cleanup(){
    this.numbers.splice(0, this.numbers.length);
    this.notesParent.splice(0, this.notesParent.length);
    this.appliedNumbers.splice(0, this.appliedNumbers.length);
    this.interviewNumbers.splice(0, this.interviewNumbers.length);
    this.offeredNumbers.splice(0, this.offeredNumbers.length);
    this.rejectedNumbers.splice(0, this.rejectedNumbers.length);

    
  }

  /**
   * 
   * @param job 
   * Updates the status of the job on dropping to another section
   */

  updatePlacardJobStatus(job: Job){
  this.job = job;
      
    let updateStatus$: Observable<any> = this.placardService.updatePlacardJobStatus(this.job);
    updateStatus$.subscribe(
      (data)=>{
        console.log(data);
      }
    )
  

  }

}
