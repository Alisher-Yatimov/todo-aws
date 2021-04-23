// @flow
import { Redirect, Route } from "react-router-dom";

type Props = {
  auth: any,
  component: React$Element,
};

export const PublicRoute = ({
  auth,
  component: Component,
  ...rest
}: Props): React$Element<any> => (
  <Route
    {...rest}
    render={(props) =>
      auth ? <Redirect to="/todos" /> : <Component {...props} />
    }
  />
);
