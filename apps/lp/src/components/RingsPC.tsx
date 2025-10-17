import type { JSX } from 'preact';

type Props = JSX.SVGAttributes<SVGSVGElement>;

const RingsPC = (props: Props) => (
  <svg
    width="441"
    height="543"
    viewBox="0 0 441 543"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="377"
      cy="287"
      r="204"
      stroke="#00B48D"
      strokeWidth={72}
      shapeRendering="geometricPrecision"
    />
    <circle
      cx="196"
      cy="196"
      r="144"
      stroke="#00418E"
      strokeWidth={72}
      shapeRendering="geometricPrecision"
    />
  </svg>
);

export default RingsPC;
