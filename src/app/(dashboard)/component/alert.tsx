import { Fragment } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlertProps {
  error?: boolean;
  success?: boolean;
  message: string;
}
const AlertMessage = ({ error, success, message }: AlertProps) => {
  return (
    <Fragment>
      {error ? (
        <Alert className="bg-red-100 text-red-500 mb-5 border-red-500">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
      {success ? (
        <Alert className="bg-emerald-100 text-emerald-500 border-emerald-500 mb-5">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default AlertMessage;
