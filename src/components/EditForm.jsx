// @flow

import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { todoStore } from "../stores/todos";

type Props = {
  todo: string,
  todoId: string,
  editModeHandler: () => {},
};

export const EditForm: any = observer(({ todo, todoId, editModeHandler }: Props) => {
  const { editTodo } = useContext(todoStore);
  const [editedTodo, setEditedTodo] = useState(todo);
  const inputHandler = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    setEditedTodo(e.target.value);
  };

  const submitHandler = async (
    e: SyntheticInputEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await editTodo(todoId, editedTodo);
    editModeHandler(false);
  };
  return (
    <Form className="form" onSubmit={submitHandler}>
      <Form.Group controlId="formBasicEmail" className="todo-input">
        <Form.Control
          type="text"
          placeholder="Enter todo"
          onChange={inputHandler}
          value={editedTodo}
          className="todo-input"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        edit
      </Button>
    </Form>
  );
});
