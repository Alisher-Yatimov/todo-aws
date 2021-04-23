// @flow
import { Auth } from "aws-amplify";
import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import { routes } from "../router/routes";
import type { User } from "../types/user";

const initialForm: User = {
  email: "",
  password: "",
}

class UserStore {
  userForm: User = initialForm;

  confirmCode: string = "";

  user: any = null;
  error: null | string = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      userForm: observable,
      confirmCode: observable,
      error: observable,
      loginUser: action,
      registerUser: action,
      changeUser: action,
      singOutUser: action,
      confirmUser: action,
      checkUser: action,
      clearUserForm: action,
      setError: action
    });
  }

  loginUser: function = async (): Promise<any> => {
    try {
      const user = await Auth.signIn(
        this.userForm.email,
        this.userForm.password
      );
      this.user = user;
      this.userForm = initialForm;
      return routes.todos;
    } catch (error) {
      if(error.name === "UserNotConfirmedException"){
        return routes.confirm;
      }
      this.setError(error.message);
    }
  };

  registerUser: function = async (): Promise<void> => {
    try {
      await Auth.signUp({
        username: this.userForm.email,
        password: this.userForm.password,
      });
      this.userForm = initialForm;
    } catch (error) {
      this.setError(error.message);
      console.log(error);
    }
  };

  confirmUser: function = async (code: string): Promise<void> => {
    try {
      await Auth.confirmSignUp(this.userForm.email, code);
      await this.loginUser(this.userForm.email, this.userForm.password);
    } catch (error) {
      this.setError(error.message);
      console.log(error);
    }
  };

  singOutUser: function = async (): Promise<void> => {
    try {
      await Auth.signOut({});
      this.user = null;
    } catch (error) {
      this.setError(error.message);
      console.log(error);
    }
  };

  changeUser: function = (name: string, value: string): void => {
    this.userForm[name] = value;
  };

  checkUser: function = async (): Promise<void> => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
    } catch (error) {
      this.setError(error.message);
      console.log(error);
    }
  };

  clearUserForm: function = (): void => {
    this.userForm = { email: "", password: "" };
  };

  setError: function = (error: string): void => {
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, 8000);
  }

}

export const userStore: React$Context<UserStore> = createContext(
  new UserStore()
);
