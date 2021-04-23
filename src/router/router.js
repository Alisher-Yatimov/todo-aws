// @flow
import { useContext } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Confirm } from "../pages/Confirm";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { userStore } from "../stores/user";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { routes } from "./routes";
import { Todos } from "../pages/Todos";
import { observer } from "mobx-react-lite";

export const Routes: any = observer((): React$Element<any> => {
  const { user } = useContext(userStore);
  return (
    <Switch>
      <Layout>
        <PublicRoute path={routes.login} auth={user} component={Login} exact />
        <PublicRoute path={routes.register} auth={user} component={Register} exact />
        <PublicRoute path={routes.confirm} auth={user} component={Confirm} exact />
        <PrivateRoute path={routes.todos} auth={user} component={Todos} exact/>
        <Redirect from="/" to={routes.login} />
      </Layout>
    </Switch>
  );
});
