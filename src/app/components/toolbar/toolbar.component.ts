import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/tasks-model';
import { TasksService } from 'src/app/services/tasks.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<Task>();
  taskobj = new Task();

  constructor(public taskService: TasksService,
   ) { }
  
  ngOnInit(): void {
  }
  createTask(){
    this.taskService.createTask(this.taskobj).subscribe((res: any) => {
      if(res){
        this.newItemEvent.emit(this.taskobj);
        this.taskobj = new Task();
      }
    });
  }
 


}
