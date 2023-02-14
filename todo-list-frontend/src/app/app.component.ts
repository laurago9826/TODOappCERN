import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {combineLatest, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input id="search" type="text" [ngModel]="searchSubject | async" (ngModelChange)="updateSearchSubject($event)">
      <app-progress-bar *ngIf="!(todos$ | async)"></app-progress-bar>
      <app-todo-item *ngFor="let todo of todoSubject | async " [item]="todo"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly todos$: Observable<Todo[]>;
  todoSubject: Subject<Todo[]> = new Subject<Todo[]>();
  searchSubject: Subject<string> = new Subject<string>();
  searchPattern: string = '';

  constructor(todoService: TodoService) {
    this.todos$ = todoService.getAll();
    this.todos$.subscribe(todos => this.todoSubject.next(todos.filter(todo => todo.task.includes(this.searchPattern))))
    combineLatest(this.todos$, this.searchSubject).subscribe(([todos, searchPattern]) => {
      this.todoSubject.next(todos.filter(todo => todo.task.includes(searchPattern)))
    });
  }

  updateSearchSubject(searchPattern: string) {
    this.searchPattern = searchPattern;
    this.searchSubject.next(searchPattern);
  }
}
