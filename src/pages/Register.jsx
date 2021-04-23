// @flow
import { UserForm } from "../components/UserForm";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { userStore } from "../stores/user";
import { Toast } from "../components/Toast";

export const Register: any = observer(() => {
  const { registerUser, error } = useContext(userStore);
  return (
    <>
      <h1>Register please</h1>
      <UserForm formHandler={registerUser} />
      {error && <Toast message={error} variant=""primary/>}
    </>
  );
});
