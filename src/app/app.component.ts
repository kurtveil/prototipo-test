import { Component } from '@angular/core';
import { Task } from './models/tasks-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prototype-test';
  taskShared = new Task();

  addItem(newItem: Task) {
    this.taskShared = newItem;
  }

}
