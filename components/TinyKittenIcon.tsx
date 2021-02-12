import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const TinyKittenIcon: React.FC<Props> = (props: Props) => (
  <svg
    {...props}
    viewBox="0 0 512 512"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 1.41421,
    }}
  >
    <circle cx="256" cy="256" r="256" fill="#008ffe" />
    <path
      d="M142.478,263.784l-59.03,118.396l-10.739,-5.354l117.096,-234.858l5.144,-10.317l1.499,-3.651l1.621,3.651l5.144,10.317l-6.704,13.447l-47.799,95.869l95.598,0l-47.799,-95.869l6.704,-13.447l51.796,103.886l-2.707,5.43l2.707,-5.43l51.796,-103.886l6.704,13.447l-47.799,95.869l95.598,0l-47.799,-95.869l-6.704,-13.447l5.144,-10.317l1.56,-3.603l1.56,3.603l122.24,245.175l-10.739,5.354l-59.03,-118.396l-103.591,0l56.36,113.042l-10.739,5.354l-54.561,-109.432l-54.561,109.432l-10.739,-5.354l56.36,-113.042l-103.591,0Zm112.531,8.964l4.469,-8.964l-4.469,8.964Zm-65.204,-130.78l6.704,13.447l-4.712,-9.45l-1.992,-3.997Z"
      fill="#fff"
    />
  </svg>
);

export default TinyKittenIcon;
