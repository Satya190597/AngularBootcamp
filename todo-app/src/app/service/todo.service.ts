import { Injectable } from '@angular/core';
import {Todo} from './../models/Todo';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

/**
 * TO DO SERVICE.
 */
export class TodoService {

  // Predefine TO-DO List.
  todos: Todo[] = [{
    id:'1233',
    title:'LEARN ANGULAR',
    date:new Date(),
    isComplete:false
  },
  {
    id:'1234',
    title:'LEARN TYPE SCRIPT',
    date:new Date(),
    isComplete:false
  },
  {
    id:'1235',
    title:'LEARN JAVA',
    date:new Date(),
    isComplete:false
  }]

  constructor() { 
  }


  /**
   * Get list of todos.
   */
  getTodos = () => {
    return of(this.todos)
  }

  /**
   * Add a new todo.
   * @param todo 
   */
  addTodo = (todo:Todo) => {
    this.todos.push(todo)
  }

  /**
   * Update a todo.
   * @param todo
   */
  updateTodo = (todo:Todo) => {
    this.todos.map(value => {
      if(value.id === todo.id) {
        return value.isComplete = !value.isComplete
      }
    })
  }

  /**
   * Delete a todo.
   * @param todo 
   */
  deleteTodo = (todo:Todo) => {
    let index = this.todos.findIndex(value => {
      return value.id === todo.id
    })
    this.todos.splice(index,1)
  }
}
