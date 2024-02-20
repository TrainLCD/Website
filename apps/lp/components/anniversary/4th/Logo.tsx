import { SVGAttributes } from 'react';

const SpecialLogo: React.VFC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="600"
      height="760"
      viewBox="0 0 600 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_505_15)">
        <rect x="4" width="592" height="752" rx="84" fill="#231E1F" />
        <rect
          x="68"
          y="223"
          width="464"
          height="464"
          rx="24"
          fill="white"
          stroke="#E94560"
          strokeWidth="48"
        />
        <path
          d="M283.723 302.32V321.2L252.523 320.72V414H229.643V320.72L199.083 321.2V302.32H283.723Z"
          fill="black"
        />
        <path
          d="M296.206 414V302.32H318.926V346.8H363.726V302.32H386.286V414H363.726V365.68H318.926V414H296.206Z"
          fill="black"
        />
        <path
          d="M227.991 435.6C267.831 435.6 287.751 464.32 287.751 521.76C287.751 579.84 267.431 608.88 226.791 608.88C185.671 608.88 165.111 580.48 165.111 523.68C165.111 493.76 170.231 471.6 180.471 457.2C190.711 442.8 206.551 435.6 227.991 435.6ZM254.151 522.48C254.151 481.04 244.951 460.32 226.551 460.32C208.151 460.32 198.951 480.48 198.951 520.8C198.951 563.04 208.231 584.16 226.791 584.16C235.591 584.16 242.311 578.96 246.951 568.56C251.751 558 254.151 542.64 254.151 522.48Z"
          fill="black"
        />
        <path
          d="M412.48 438.48V546.24H435.28V571.68H412.48V606H380.56V571.68H303.04V544.8L371.68 438.48H412.48ZM381.28 546.24V517.92C381.28 498.08 381.6 479.84 382.24 463.2H381.76C375.36 475.84 367.44 489.6 358 504.48L332.08 546.24H381.28Z"
          fill="black"
        />
        <path
          d="M194.374 45.32L238.854 157H214.374L204.614 131.24H158.054L148.294 157H125.094L168.934 45.32H194.374ZM198.534 114.28L189.254 88.2C186.268 79.7733 183.708 71.3467 181.574 62.92H181.254C179.228 70.1733 176.508 78.6 173.094 88.2L163.814 114.28H198.534Z"
          fill="white"
        />
        <path
          d="M328.224 92.2V45.32H348.544V157H320.064L291.424 102.28C285.131 90.3333 279.744 78.8667 275.264 67.88H274.944C275.478 75.56 275.744 87.88 275.744 104.84V157H255.424V45.32H285.504L313.664 100.52C318.251 109.373 323.318 120.253 328.864 133.16H329.184C328.544 122.28 328.224 108.627 328.224 92.2Z"
          fill="white"
        />
        <path
          d="M388.544 45.32L412.224 118.12C412.544 119.187 413.131 121.107 413.984 123.88C414.944 126.547 415.798 129.053 416.544 131.4C417.291 133.747 417.878 135.773 418.304 137.48H418.624C420.651 130.227 422.571 123.773 424.384 118.12L448.384 45.32H471.104L431.264 157H403.904L364.384 45.32H388.544Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_505_15"
          x="0"
          y="0"
          width="600"
          height="760"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_505_15"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_505_15"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SpecialLogo;
