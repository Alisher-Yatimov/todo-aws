// @flow
import { Container } from "react-bootstrap";
import { Header } from "./Header";

type Props = {
  children: React$Node,
};

export const Layout = ({
  children,
}: Props): React$Element<React$FragmentType> => (
  <>
    <Header />
    <Container>{children}</Container>
  </>
);
