// @flow
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {Form, Button} from 'react-bootstrap';
import { todoStore } from "../stores/todos";

export const TodoForm: any = observer(() => {
  const { todo, enterTodo, createTodo } = useContext(todoStore);
  const inputHandler = (e: SyntheticInputEvent<HTMLInputElement>) => {
    enterTodo(e.target.value);
  }
  const submitHandler = (e: SyntheticInputEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo();
  }
  return (
    <Form className="form" onSubmit={submitHandler}>
      <Form.Group controlId="formBasicEmail" className="todo-input">
        <Form.Control type="text" placeholder="Enter todo" onChange={inputHandler} value={todo} />
      </Form.Group>
      <Button variant="primary" type="submit">
        add
      </Button>
    </Form>
  );
});
