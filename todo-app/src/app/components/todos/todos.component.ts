import { Component, OnInit } from '@angular/core';
import {TodoService} from './../../service/todo.service';
import {Todo} from './../../models/Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  private todos: Todo[];

  constructor(private todoService: TodoService) { 
    todoService.getTodos().subscribe(values => {
      this.todos = values;
    })
  }

  ngOnInit() {
  }
  handleCheckEvent = (todos:Todo) => {
    this.todoService.updateTodo(todos)
  }
  delete = (todos:Todo) => {
    this.todoService.deleteTodo(todos)
  }
}
