import type { StatusType } from 'data';
import type { SVGProps } from 'react';
import { CheckmarkIcon } from './icons/Checkmark';
import { ErrorIcon } from './icons/Error';
import { QuestionIcon } from './icons/Question';
import { WarningIcon } from './icons/Warning';

type Props = {
  status: StatusType;
} & SVGProps<SVGSVGElement>;

export const StatusIcon = ({ status, className, ...rest }: Props) => {
  const baseClass = className || '';
  
  switch (status) {
    case 'operational':
      return (
        <CheckmarkIcon
          {...rest}
          className={`${baseClass} text-green-500`}
        />
      );
    case 'maintenance':
    case 'degraded':
    case 'partiallyMaintenance':
    case 'partiallyDegraded':
      return (
        <WarningIcon
          {...rest}
          className={`${baseClass} text-yellow-500`}
        />
      );
    case 'outage':
      return (
        <ErrorIcon
          {...rest}
          className={`${baseClass} text-red-500`}
        />
      );
    case 'unknown':
    default:
      return (
        <QuestionIcon
          {...rest}
          className={`${baseClass} text-purple-500`}
        />
      );
  }
};
