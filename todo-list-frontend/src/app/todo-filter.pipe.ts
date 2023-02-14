import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "./todo.service";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[] | null, searchValue: string): Todo[] | undefined {
    //return todos.pipe(map(todos => todos.filter(todo => todo.task.includes(searchValue))));
    console.log('transform')
    return todos?.filter(todo => todo.task.includes(searchValue));
  }
}
