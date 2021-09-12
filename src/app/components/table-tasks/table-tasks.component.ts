import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/tasks-model';
import { HttpClient } from '@angular/common/http';
import { TasksService } from 'src/app/services/tasks.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENTS: Task[] = [];
@Component({
  selector: 'app-table-tasks',
  templateUrl: './table-tasks.component.html',
  styleUrls: ['./table-tasks.component.scss'],
})
export class TableTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'id',
    'title',
    'complete',
    'delete'
  ];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  taskArray = new MatTableDataSource<Task>(ELEMENTS);

  @ViewChild(MatPaginator) paginator!: MatPaginator 
  @ViewChild(MatSort) sort!: MatSort;
  @Input() valores: any;

  constructor(public tasksServices: TasksService,
              private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getTasksArray();
     }

  getTasksArray() {
    this.tasksServices.getTasks().subscribe((tasks: any) => {
      this.taskArray.data = tasks
        this.taskArray.data.sort(function (a , b){
          if (a.id > b.id) {
            return 1;
          }  
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        })
        this.taskArray.sort = this.sort; 
      this.taskArray.paginator = this.paginator;
    });
  }
  completeTask(element: any){

  }

  deleteTask(id: any){
    this.tasksServices.deleteTask(id).subscribe((res: any) => {
      if(res){
        console.log('Se elimino correctamente');
        this.getTasksArray();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.taskArray.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.taskArray.data.slice();
    if (!sort.active || sort.direction == '') {
      this.taskArray.data = data;
      return;
    }

    this.taskArray.data = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      console.log(sort.active);
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
      
        default: return 0;
      }
    });
  }

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}