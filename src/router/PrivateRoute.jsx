// @flow
import { Redirect, Route } from "react-router-dom";
import { routes } from "./routes";

type Props = {
  component: React$Element,
  auth: any,
};

export const PrivateRoute = ({ component: Component, auth, ...rest }: Props): React$Element<any> => (
  <Route
    {...rest}
    render={(props) => 
      auth ? <Component {...props} /> : <Redirect to={routes.login} />
    }
  />
);
