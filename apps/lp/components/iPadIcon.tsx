import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const IPadIcon: React.FC<Props> = (props: Props) => (
  <svg
    {...props}
    width="56"
    height="64"
    viewBox="0 0 56 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 0H6C2.6875 0 0 2.6875 0 6V58C0 61.3125 2.6875 64 6 64H50C53.3125 64 56 61.3125 56 58V6C56 2.6875 53.3125 0 50 0ZM28 60C25.7875 60 24 58.2125 24 56C24 53.7875 25.7875 52 28 52C30.2125 52 32 53.7875 32 56C32 58.2125 30.2125 60 28 60Z"
      fill="#333333"
    />
  </svg>
);

export default IPadIcon;
