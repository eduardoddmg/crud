import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const Success = ({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) => {
  return (
    <Alert className="bg-green-700 text-white">
      <Check />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

const Error = ({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) => {
  return (
    <Alert className="bg-red-700 text-white">
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export const AlertComp = { Success, Error };
