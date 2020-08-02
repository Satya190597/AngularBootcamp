import { Component, OnInit } from '@angular/core'
import { Todo } from '../../models/Todo'
import { v4 } from 'uuid'
import { TodoService } from '../../service/todo.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  constructor(private todoService:TodoService) { }

  todoTitle: string = ''

  ngOnInit() {
  }
  
  addToDo() {
      const newTodo: Todo = {
        id: v4(),
        date: new Date(),
        title: this.todoTitle,
        isComplete: false
      }
      this.todoService.addTodo(newTodo)
  }
}
