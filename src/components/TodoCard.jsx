// @flow

import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { todoStore } from "../stores/todos";
import { EditForm } from "./EditForm";

type Props = {
  id: string,
  title: string,
};

export const TodoCard: any = observer(({ id, title }: Props) => {
  const { deleteTodo } = useContext(todoStore);
  const [editMode, setEditMode] = useState(false);
  const trashBtnHandler = async (): Promise<void> => {
    await deleteTodo(id);
  };
  return (
    <Card className="todo-card">
      {editMode ? (
        <EditForm todo={title} todoId={id} editModeHandler={setEditMode} />
      ) : (
        <>
          <Card.Body>{title}</Card.Body>
          <div className="btn-box">
            <Button onClick={() => setEditMode(true)}>✏️</Button>
            <Button variant="warning" onClick={trashBtnHandler}>
              🗑️
            </Button>
          </div>
        </>
      )}
    </Card>
  );
});
