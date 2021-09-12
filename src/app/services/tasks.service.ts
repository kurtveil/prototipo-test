import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public urlBase = '';
  public httpOptions = new HttpHeaders().append(
    'Content-Type',
    'application/json; charset=UTF-8'
  );
  constructor(public http: HttpClient) {
    this.urlBase = environment.url_tasks;
   }


  getTasks() {
    const url = `${this.urlBase}`;
    return this.http.get(url).pipe(map(res => res
    ));
  }


  createTask(task:any) {
    console.log(task);
    const url = `${this.urlBase}`;
    return this.http.post(url, task, { headers: this.httpOptions }).pipe(map(res => res
    ));
  }

  updateTask(id: any) {
    const url = `${this.urlBase}/?id=${id}`;
    return this.http.put(url, { headers: this.httpOptions }).pipe(map(res => res
    ));
  }

  deleteTask(id: any) {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete(url, { headers: this.httpOptions }).pipe(map(res => res
      ));
    ;
  }

}
