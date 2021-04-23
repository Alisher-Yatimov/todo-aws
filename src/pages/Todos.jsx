// @flow
import { observer } from "mobx-react-lite";
import { useEffect, useContext, useCallback } from "react";
import { Loader } from "../components/Loader";
import { TodoCard } from "../components/TodoCard";
import { TodoForm } from "../components/TodoForm";
import { todoStore } from "../stores/todos";
import { userStore } from "../stores/user";

export const Todos: any = observer(() => {
  const { getTodos, todos, todoLoading } = useContext(todoStore);
  const { user } = useContext(userStore);
  const getAllTodos = useCallback(async () => {
    await getTodos(user.username);
  }, [getTodos, user.username]);
  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  if(todoLoading) {
    return <Loader />
  }
  return (
    <>
      <TodoForm />
      {todos.length ? (
        todos.map((todo) => <TodoCard key={todo.id} id={todo.id} title={todo.name}/>)
      ) : (
        <p className="todo-msg">todo list is empty</p>
      )}
    </>
  );
});
