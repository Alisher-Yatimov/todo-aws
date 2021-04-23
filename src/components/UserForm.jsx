// @flow
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { userStore } from "../stores/user";
import { useHistory } from "react-router";

type Props = {
  formHandler: () => {},
  redirectTo: string
}

export const UserForm: any = observer(({formHandler}: Props): React$Element<any> => {
  const { userForm, changeUser } = useContext(userStore);
  const history = useHistory();
  const inputHandler = (e: SyntheticInputEvent<HTMLInputElement>) => {
    changeUser(e.target.name, e.target.value);
  }
  const submitHandler = async (e: SyntheticInputEvent<HTMLFormElement>) => {
    e.preventDefault();
    const redirectTo = await formHandler();
    history.push(redirectTo);
  }
  return (
      <Form onSubmit={submitHandler} className="user-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onInput={inputHandler}
            value={userForm.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={inputHandler}
            value={userForm.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  );
});
