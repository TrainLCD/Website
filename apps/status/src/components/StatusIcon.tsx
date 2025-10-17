import type { StatusType } from 'data';
import type { JSX } from 'preact';
import { CheckmarkIcon } from './icons/Checkmark';
import { ErrorIcon } from './icons/Error';
import { QuestionIcon } from './icons/Question';
import { WarningIcon } from './icons/Warning';

type Props = {
  status: StatusType;
} & JSX.SVGAttributes<SVGSVGElement>;

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

export const StatusIcon = ({ status, className, ...rest }: Props) => {
  switch (status) {
    case 'operational':
      return (
        <CheckmarkIcon
          {...rest}
          className={cx(className, 'text-green-500')}
        />
      );
    case 'maintenance':
    case 'degraded':
    case 'partiallyMaintenance':
    case 'partiallyDegraded':
      return (
        <WarningIcon
          {...rest}
          className={cx(className, 'text-yellow-500')}
        />
      );
    case 'outage':
      return (
        <ErrorIcon
          {...rest}
          className={cx(className, 'text-red-500')}
        />
      );
    case 'unknown':
    default:
      return (
        <QuestionIcon
          {...rest}
          className={cx(className, 'text-purple-500')}
        />
      );
  }
};
