// @flow
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { routes } from "../router/routes";
import { userStore } from "../stores/user";
import { Toast } from "../components/Toast";

export const Confirm: any = observer(() => {
  const history = useHistory();
  const [code, setCode] = useState("");
  const { confirmUser, error } = useContext(userStore);
  const submitHandler = async (e: SyntheticInputEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await confirmUser(code);
      history.push(routes.todos);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Confirm your email address</h1>
      <form onSubmit={submitHandler} className="confirm-form">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          name="confirmCode"
        />
        <Button variant="primary" type="submit">
          confirm
        </Button>
      </form>
      {error && <Toast variant="primary" message={error} />}
    </>
  );
});
