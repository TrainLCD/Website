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
    <g filter="url(#filter0_d_893_6)">
      <circle
        cx="377"
        cy="287"
        r="204"
        stroke="#00B48D"
        strokeWidth={72}
        shapeRendering="crispEdges"
      />
    </g>
    <g style={{ mixBlendMode: 'multiply' }} filter="url(#filter1_d_893_6)">
      <circle
        cx="196"
        cy="196"
        r="144"
        stroke="#00418E"
        strokeWidth={72}
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_893_6"
        x="121"
        y="31"
        width="512"
        height="512"
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
          result="effect1_dropShadow_893_6"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_893_6"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_893_6"
        x="0"
        y="0"
        width="392"
        height="392"
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
          values="0 0 0 0 0 0 0 0 0 0.254902 0 0 0 0 0.556863 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_893_6"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_893_6"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default RingsPC;
