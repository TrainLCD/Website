import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const RingsPC: React.FC<Props> = (props: Props) => (
  <svg
    width="176"
    height="192"
    viewBox="0 0 176 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_866_207)">
      <circle
        cx="96"
        cy="96"
        r="64"
        stroke="#00B48D"
        strokeWidth={32}
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_866_207"
        x="0"
        y="0"
        width="192"
        height="192"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="8" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0.705882 0 0 0 0 0.552941 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_866_207"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_866_207"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default RingsPC;
