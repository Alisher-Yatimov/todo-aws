// @flow
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { routes } from '../router/routes';
import { observer } from 'mobx-react-lite';
import { useContext } from "react";
import { userStore } from "../stores/user";
import { Button } from "react-bootstrap";

export const Header: any = observer((): React$Element<any> => {
  const { user, singOutUser } = useContext(userStore);
  return (
    <Navbar bg="dark" variant="dark" style={{justifyContent: 'space-between'}}>
      <Navbar.Brand href="#home">Todos</Navbar.Brand>
      {!user && (
        <Nav>
          <NavLink
            to={routes.login}
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Login
          </NavLink>
          <NavLink
            to={routes.register}
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Register
          </NavLink>
        </Nav>
      )}
      {user && <Button onClick={singOutUser} variant="primary">log out</Button>}
    </Navbar>
  );
});
