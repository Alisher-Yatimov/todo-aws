// @flow

import { UserForm } from "../components/UserForm";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { userStore } from "../stores/user";
import { Toast } from "../components/Toast";

export const Login: any = observer(() => {
  const { loginUser, error } = useContext(userStore);
  return (
    <>
      <h1>Login please</h1>
      <UserForm formHandler={loginUser} />
      {error && <Toast variant="primary" message={error}/>}
    </>
  );
});
