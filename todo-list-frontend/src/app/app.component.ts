import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {combineLatest, Subject} from "rxjs";

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
      <app-progress-bar *ngIf="!(todoSubject | async)"></app-progress-bar>
      <app-todo-item *ngFor="let todo of filteredTodoSubject | async " [item]="todo"
                     (click)="removeItem(todo)"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  todoSubject: Subject<Todo[]> = new Subject<Todo[]>();
  filteredTodoSubject: Subject<Todo[]> = new Subject<Todo[]>();
  searchSubject: Subject<string> = new Subject<string>();
  searchPattern: string = '';

  constructor(private todoService: TodoService) {
    todoService.getAll().subscribe(todos => this.todoSubject.next(todos))
    this.todoSubject.subscribe(todos => this.filteredTodoSubject.next(todos.filter(todo => todo.task.includes(this.searchPattern))))
    combineLatest(this.todoSubject, this.searchSubject).subscribe(([todos, searchPattern]) => {
      this.filteredTodoSubject.next(todos.filter(todo => todo.task.includes(searchPattern)))
    });
  }

  updateSearchSubject(searchPattern: string) {
    this.searchPattern = searchPattern;
    this.searchSubject.next(searchPattern);
  }

  removeItem(item: Todo) {
    this.todoService.remove(item.id).subscribe(
        () => this.todoService.getAll().subscribe(todos => this.todoSubject.next(todos)),
        error => console.log('An error occurred during the deletion of task "' + item.task + '".'));
  }
}
