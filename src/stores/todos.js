// @flow

import { createContext } from "react";
import { action, makeObservable, observable } from "mobx";
import { API } from "aws-amplify";
import { todosByDate } from "../graphql/queries";
import { createTodo, deleteTodo, updateTodo } from "../graphql/mutations";
import type { Todo } from "../types/todo";

class TodoStore {
  todos: Array<Todo> = [];
  todo: string = "";
  todoLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      todos: observable,
      todo: observable,
      todoLoading: observable,
      getTodos: action,
      enterTodo: action,
    });
  }
  getTodos: function = async (userID: string): Promise<void> => {
    try {
      this.todoLoading = true;
      const todos = await API.graphql({
        query: todosByDate,
        variables: { type: "Todo", sortDirection: "DESC" },
      });
      this.todos = todos.data.todosByDate.items;
      this.todoLoading = false;
    } catch (error) {
      this.todoLoading = false;
      console.log(error);
    }
  };

  enterTodo: function = (text: string): void => {
    this.todo = text;
  };

  createTodo: function = async (): Promise<void> => {
    try {
      const todo = await API.graphql({
        query: createTodo,
        variables: {
          input: { name: this.todo, description: "", type: "Todo" },
        },
      });
      this.todos = [todo.data.createTodo, ...this.todos];
      this.todo = "";
    } catch (error) {
      console.log(error);
    }
  };

  deleteTodo: function = async (todoId: string): Promise<void> => {
    const todo = await API.graphql({
      query: deleteTodo,
      variables: {
        input: {
          id: todoId,
        },
      },
    });
    const { id: removedId } = todo.data.deleteTodo;
    this.todos = this.todos.filter((todo) => todo.id !== removedId);
  };

  editTodo: function = async (todoId: string, todo: string): Promise<void> => {
    const {
      data: { updateTodo: updatedTodo },
    } = await API.graphql({
      query: updateTodo,
      variables: {
        input: {
          id: todoId,
          name: todo,
        },
      },
    });
    this.todos = this.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
  };
}

export const todoStore: React$Context<TodoStore> = createContext(
  new TodoStore()
);
