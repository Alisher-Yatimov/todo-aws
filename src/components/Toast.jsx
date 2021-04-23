// @flow

import { Alert } from 'react-bootstrap';

type Props = {
  variant: string,
  message: string
}
export const Toast = ({variant, message}: Props): React$Element<any> => (
  <Alert variant={variant} className="toast">
    {message}
  </Alert>
)