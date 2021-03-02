import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { PlacardPopupFormComponent } from '../placard-popup-form/placard-popup-form.component';
import {Job} from '../../models/job';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-app-tracker-wishlist',
  templateUrl: './app-tracker-wishlist.component.html',
  styleUrls: ['./app-tracker-wishlist.component.css']
})
export class AppTrackerWishlistComponent implements OnInit {

  /* @Input()*/ notesParent: Array<Job>;
  @Input() placard: Job;
  ctx = {
    fullname: "",
    applied: "", 
    interviews: "", 
    offers: "",
    rejected: ""
  }
  editProfileForm: FormGroup;
  // placardParent: Array<Placard>;
  constructor(private dialog: MatDialog, private modalService: NgbModal, private fb: FormBuilder) {
 
   }

  ngOnInit(): void {

    this.editProfileForm = this.fb.group({
      fullname: ['']
    
    });
  }

  popupPlacardForm(){
    console.log('came in the popupPlacardForm');
    const dialofConfig = new MatDialogConfig();
    dialofConfig.autoFocus = true;
    dialofConfig.disableClose = true;
    dialofConfig.width = "40%"; 
    dialofConfig.data ={myArr: this.notesParent,
    title: "tester tester"}
    this.dialog.open(PlacardPopupFormComponent);
  }

  openModal(targetModal) {
   
    
    this.ctx.fullname = "user.fullname";
    // this.ctx.applied = user.applied;
    // this.ctx.interviews = user.interviews;
    // this.ctx.offers = user.offers;
    // this.ctx.rejected = user.rejected;

    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editProfileForm.setValue({
    
    });
   }

 

}
