import type { StatusType } from 'data';
import type { JSX } from 'preact';
import { CheckmarkIcon } from './icons/Checkmark';
import { ErrorIcon } from './icons/Error';
import { QuestionIcon } from './icons/Question';
import { WarningIcon } from './icons/Warning';

type Props = {
  status: StatusType;
} & JSX.SVGAttributes<SVGSVGElement>;

type SignalLike<T> = { value: T } | { peek: () => T } | { value: T; peek: () => T };

const toPlainClass = (value: string | undefined | SignalLike<string | undefined>) => {
  if (typeof value === 'string' || typeof value === 'undefined') {
    return value;
  }
  if (value && typeof (value as { peek?: () => unknown }).peek === 'function') {
    return (value as { peek: () => string | undefined }).peek();
  }
  if (value && 'value' in value) {
    return (value as { value: string | undefined }).value;
  }
  return undefined;
};

const cx = (...classes: (string | undefined | SignalLike<string | undefined>)[]) =>
  classes
    .map((c) => toPlainClass(c))
    .filter((c): c is string => Boolean(c))
    .join(' ');

export const StatusIcon = ({ status, className, ...rest }: Props) => {
  switch (status) {
    case 'operational':
      return (
        <CheckmarkIcon
          {...rest}
          className={cx(className ?? undefined, 'text-green-500')}
        />
      );
    case 'maintenance':
    case 'degraded':
    case 'partiallyMaintenance':
    case 'partiallyDegraded':
      return (
        <WarningIcon
          {...rest}
          className={cx(className ?? undefined, 'text-yellow-500')}
        />
      );
    case 'outage':
      return (
        <ErrorIcon
          {...rest}
          className={cx(className ?? undefined, 'text-red-500')}
        />
      );
    case 'unknown':
    default:
      return (
        <QuestionIcon
          {...rest}
          className={cx(className ?? undefined, 'text-purple-500')}
        />
      );
  }
};
