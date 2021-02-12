import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const ArrowIcon: React.FC<Props> = (props: Props) => (
  <svg {...props} width="65.793" height="26.703" viewBox="0 0 65.793 26.703">
    <path
      d="M131.6,273.427l32.208,24,31.792-23.69"
      transform="translate(-130.702 -272.224)"
      fill="none"
      stroke="#aaa"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
  </svg>
);

export default ArrowIcon;
