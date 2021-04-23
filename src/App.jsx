/* @flow */
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./router/router";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useCallback } from "react";
import { userStore } from "./stores/user";
import "./App.css";

const App: any = observer(() => {
  const { checkUser } = useContext(userStore);
  const isUserLogin = useCallback(async () => {
    await checkUser();
  }, [checkUser]);
  useEffect(() => {
    isUserLogin();
  }, [isUserLogin]);
  return (
    <Router>
      <Routes />
    </Router>
  );
});

export default App;
