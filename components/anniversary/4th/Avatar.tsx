import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const Avatar: React.FC<Props> = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 630 630"
    width={630}
    height={630}
    {...props}
  >
    <circle style={{ fill: '#008ffe' }} cx="315" cy="315" r="315" />
    <polygon
      style={{ fill: '#fff', fillRule: 'evenodd' }}
      points="175.3 324.6 102.7 470.3 89.5 463.7 233.5 174.7 239.9 162 241.7 157.5 243.7 162 250 174.7 241.8 191.2 183 309.2 300.6 309.2 241.8 191.2 250 174.7 313.8 302.5 310.4 309.2 313.8 302.5 377.5 174.7 385.8 191.2 326.9 309.2 444.6 309.2 385.8 191.2 377.5 174.7 383.8 162 385.8 157.6 387.7 162 538.1 463.7 524.9 470.3 452.2 324.6 324.8 324.6 394.1 463.7 380.9 470.3 313.8 335.6 246.6 470.3 233.4 463.7 302.8 324.6 175.3 324.6"
    />
  </svg>
);

export default Avatar;
