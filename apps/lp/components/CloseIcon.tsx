import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const CloseIcon: React.FC<Props> = (props: Props) => (
  <svg
    {...props}
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    width="256px"
    height="256px"
    opacity={1}
  >
    <g>
      <polygon
        points="511.998,70.682 441.315,0 256.002,185.313 70.685,0 0.002,70.692 185.316,256.006 0.002,441.318 
		70.69,512 256.002,326.688 441.315,512 511.998,441.318 326.684,256.006 	"
        fill="#333"
      ></polygon>
    </g>
  </svg>
);

export default CloseIcon;
