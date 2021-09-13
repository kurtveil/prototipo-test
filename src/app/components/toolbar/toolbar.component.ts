import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/tasks-model';
import { TasksService } from 'src/app/services/tasks.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {
  @Output() newItemEvent = new EventEmitter<Task>();
  taskobj = new Task();
  @Input() taskSelected = new Task();
  isSave = false;
  constructor(public taskService: TasksService,
   ) { }
  
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.setTask(changes.taskSelected.currentValue);
  }
  setTask(task: any){
    if (task.title !== '') {
      this.taskobj = task;
    }
  }
  createTask(){
    this.isSave = true;
    this.taskService.createTask(this.taskobj).subscribe((res: any) => {
      if(res){
        this.setTimeSave();
        this.newItemEvent.emit(this.taskobj);
        this.taskobj = new Task();
      }
    });
  }

  updateTask(){
    this.isSave = true;
    this.taskService.updateTask(this.taskobj.id).subscribe(res => {
      if(res){
        this.setTimeSave();
        this.taskobj = new Task();
      }
    });
  }

  setTimeSave(){
    setTimeout(() => {
      this.isSave = false;
    }, 1000);
  }

  verifyProcess(){
   if(this.taskobj.id === ''){
      this.createTask();
   } else {
     this.updateTask();
   }
  }
 


}
