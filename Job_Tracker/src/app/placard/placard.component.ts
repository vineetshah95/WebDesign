import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Job} from './../../models/job';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { TasksComponent } from '../tasks/tasks.component';
import { WindowComponent } from '../window/window.component';
import { PlacardService } from '../services/placard.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import {Router} from '@angular/router';


@Component({
  selector: 'app-placard',
  templateUrl: './placard.component.html',
  styleUrls: ['./placard.component.scss']
})
export class PlacardComponent implements OnInit {

  //Input and output used for communication between components
  @Input() placard: PlacardComponent;
  @Input() job: Job;
  @Output() newDeleteEmitted = new EventEmitter();

  classObject: any = {
    job: true ? 'job': ''
  };
  styleObject: any;
  placardService: PlacardService
  
  constructor(public dialog: MatDialog, placardService: PlacardService, private router: Router) {
      this.placardService = placardService;
   }

  ngOnInit(): void {
    this.styleObject = this.getNotePosition();
  }

  /**
   * For deleting the placard
   * This gets called when the button is icon is clicked on the UI
   */
  deletePlacard(){
    this.dialog.closeAll();
    let deletePlacard$: Observable<any> = this.placardService.deletePlacard(this.job.id);
    deletePlacard$.subscribe( (deletePlacard) => {
      
      this.newDeleteEmitted.emit(deletePlacard);
       this.placardService.getPlacards();
      
      //SWALL to display the message 
       this.router.navigate(['application_tracker']);
       Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: 'Job deleted successfully!',
         showConfirmButton: false,
         timer: 1500
       
       })
    })
    
    
       
  }

  /**
   * For popping up a form to provide more details
   */
  moreDetailForm(){
    const dialogRef = this.dialog.open(PopupFormComponent);
    
  }

  /**
   * For popping up a form to provide more details
   */
  onClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    dialogConfig.data = this.job;
    this.dialog.open(WindowComponent, dialogConfig);
   
  }
  
  getNotePosition(): Object {
    let noteSize: number = 250, //Width & Height of the note
        topPadding: number = 20, //Padding around nav bar
        vPadding: number = 10, //Padding on both left and right end of the screen
        navBarHeight: number = 50, //Height of the nav bar
        minTop: number = navBarHeight + topPadding, //Min top position should be nar bar height plus top padding
        maxScreenWidth: number = window.innerWidth - (noteSize + 2 * vPadding), //max width should exclude note width and padding
        maxScreenHeight: number = window.innerHeight - (noteSize + minTop), //max height should exclude note height and padding
        randomLeft: number = Math.ceil(Math.random() * maxScreenWidth), //Random left with max screen width
        randomTop: number = Math.ceil(Math.random() * maxScreenHeight); //Random top with max screen height
    randomTop = randomTop < minTop ? minTop : randomTop; //If random top is less than min top then use min top
    randomLeft = randomLeft < vPadding ? vPadding : randomLeft; //If random left is less than vPadding then use vPadding
    return {
      /**The value is being set in the html with the styleObject
       * and these two values are set in top and left respectively in the UI
       */
        top: randomTop,
        left: randomLeft
    };
  }

}
