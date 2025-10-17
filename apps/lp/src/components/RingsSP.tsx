import type { JSX } from 'preact';

type Props = JSX.SVGAttributes<SVGSVGElement>;

const RingsPC = (props: Props) => (
  <svg
    width="176"
    height="192"
    viewBox="0 0 176 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="96"
      cy="96"
      r="64"
      stroke="#00B48D"
      strokeWidth={32}
      shapeRendering="geometricPrecision"
    />
  </svg>
);

export default RingsPC;
