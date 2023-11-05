import { Fragment } from 'react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertProps {
  error?: boolean;
  success?: boolean;
  message: string;
}
const AlertMessage = ({ error, success, message }: AlertProps) => {
  return (
    <Fragment>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default AlertMessage;
