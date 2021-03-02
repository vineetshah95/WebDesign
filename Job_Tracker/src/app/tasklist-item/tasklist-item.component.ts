import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Tasks } from 'src/models/Tasks';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tasklist-item',
  templateUrl: './tasklist-item.component.html',
  styleUrls: ['./tasklist-item.component.scss']
})
export class TasklistItemComponent implements OnInit {
  @Input() task: Tasks;
  @Output() deleteTask: EventEmitter<Tasks> = new EventEmitter();
  checkValue:Boolean = false;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void { 
    if(this.task.isDone==true){
      this.checkValue = true;
    }else{
      this.checkValue = false;
    }
   }

  setClasses(){
    let classes = {
      'is-complete': this.task.isDone
    }

    return classes;
  }

  onToggle(task){
    task.isDone = !task.isDone;
    this.tasksService.toggleCompleted(task).subscribe(task =>
      console.log(task));
  }

  onSave(){
    console.log(this.task.taskDescription)
    const data = {
      taskDescription: this.task.taskDescription
    }
    this.tasksService.updateTasks(data, this.task.id).subscribe(data =>
      console.log(data));
  }

  onDelete(task){
    this.deleteTask.emit(task);
  }

}
