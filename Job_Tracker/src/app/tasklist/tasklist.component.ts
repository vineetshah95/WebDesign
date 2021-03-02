import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/Tasks';
import { TasksService } from '../services/tasks.service';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Job } from '../../models/job';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  tasks: Tasks[];

  constructor( private tasksService: TasksService, @Inject(MAT_DIALOG_DATA) public data: any ) {
   
   }

  ngOnInit() {
    console.log(this.data.id);
    this.tasksService.getTasks(this.data.id).subscribe(tasks => {
      this.tasks = tasks;
      console.log('Task '+tasks)
    });
  }

  onSubmit(){
    let inputFields = document.querySelectorAll('input');
    console.log(inputFields);
    if(inputFields[0].value==""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Task field cannot be empty'
      })
    }else{
    const task = {
      jobId: this.data.id,
      taskDescription: inputFields[0].value,
      taskDate: new Date(inputFields[1].value),
      isDone: false
    }
    this.addTask(task);
  }
  }

  addTask(task){
    this.tasksService.addTask(task).subscribe(task => {
      this.tasks.push(task);
    });
  }

  deleteTask(task:Tasks){
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.tasksService.deleteTask(task).subscribe();
  }

}
