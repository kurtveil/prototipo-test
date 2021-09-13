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
  constructor(public taskService: TasksService,
   ) { }
  
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.taskSelected.currentValue.title !== '') {
      this.taskobj = this.taskSelected;
    }
  }
  createTask(){
    this.taskService.createTask(this.taskobj).subscribe((res: any) => {
      if(res){
        this.newItemEvent.emit(this.taskobj);
        this.taskobj = new Task();
      }
    });
  }

  updateTask(){
    this.taskService.updateTask(this.taskobj.id).subscribe(res => {
      if(res){
        this.taskobj = new Task();
      }
    });
  }

  verifyProcess(){
   if(this.taskobj.id === ''){
      this.createTask();
   } else {
     this.updateTask();
   }
  }
 


}
