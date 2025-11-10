import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const WarningIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 23a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 16 25m1.125-6.875v-7.25h-2.25v7.25Z"
    />
  </svg>
);
