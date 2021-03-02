import { Component, OnInit, Input } from '@angular/core';
import {Job} from '../../models/job';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-wishlist-area',
  templateUrl: './wishlist-area.component.html',
  styleUrls: ['./wishlist-area.component.css']
})
export class WishlistAreaComponent implements OnInit {
notesParent: Array<Job> = [];

numbers: number[] = [];

  constructor() { }

  ngOnInit(): void {
   this.initPla();
  }

  initPla(){
   for(let i=0 ;i <10;i++){
     this.numbers.push(i);
   }
  }

  drop(event: CdkDragDrop<number[]>){
    if(event.previousContainer != event.container){
      transferArrayItem(event.previousContainer.data, event.container.data,  event.previousIndex, event.currentIndex);
    }else{
    moveItemInArray (this.numbers, event.previousIndex, event.currentIndex);
  }
  }



}
