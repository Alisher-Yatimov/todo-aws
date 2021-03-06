// @flow

import { Spinner } from "react-bootstrap";
export const Loader = (): React$Element<"div"> => (
  <div className="loader">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);
