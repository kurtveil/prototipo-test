import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/tasks-model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  taskobj = new Task();

  constructor(public taskService: TasksService,
   ) { }

  
  ngOnInit(): void {
  }
  createTask(){
    console.log(this.taskobj);
    this.taskService.createTask(this.taskobj).subscribe(res => {
      console.log(res);
    });
  }



}
