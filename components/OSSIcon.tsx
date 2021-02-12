import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const OSSIcon: React.FC<Props> = (props: Props) => (
  <svg
    {...props}
    width="62"
    height="60"
    viewBox="0 0 62 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 31.305C0.2875 14.33 12.175 2.25003 26.725 0.29253C44.075 -2.03247 58.675 9.76753 61.475 25.43C64.1375 40.28 55.975 54.18 42.525 59.68C41.3625 60.155 40.725 59.8925 40.275 58.7175C38.05 52.93 35.825 47.1384 33.6 41.3425C33.2125 40.33 33.475 39.6925 34.475 39.2425C37.5 37.8675 39.3875 35.5675 39.8875 32.2675C40.0759 31.0573 40.0134 29.8212 39.7039 28.6361C39.3944 27.451 38.8445 26.3422 38.0884 25.3785C37.3323 24.4149 36.3861 23.6171 35.3086 23.0346C34.2311 22.4521 33.0454 22.0974 31.825 21.9925C26.95 21.5675 22.85 24.955 22.1375 29.455C21.4875 33.58 23.525 37.4175 27.375 39.1675C28.575 39.7175 28.8125 40.2425 28.35 41.4675C26.1125 47.2925 23.875 53.1217 21.6375 58.955C21.3125 59.8175 20.6 60.1175 19.7 59.7675C13.125 57.23 7.025 52.1425 3.35 44.8925C0.2375 38.7425 0.2 33.93 0 31.305V31.305ZM2.6125 31.0675C2.6625 31.8925 2.6875 32.855 2.775 33.83C3.5625 42.8175 8.975 51.7675 19.15 56.7175C19.55 56.905 19.7 56.8175 19.85 56.43C21.7125 51.5425 23.5875 46.655 25.475 41.7675C25.6375 41.355 25.55 41.1675 25.175 40.93C21.225 38.4425 19.2625 34.8675 19.475 30.18C19.6 27.48 20.6375 25.1175 22.45 23.1425C26.2 19.055 32.075 18.1675 36.8875 20.9425C38.8335 22.0646 40.4066 23.734 41.4112 25.7432C42.4157 27.7523 42.8074 30.0125 42.5375 32.2425C42.0875 36.0675 40.125 38.98 36.825 40.9675C36.4875 41.1675 36.3875 41.33 36.5375 41.7175C38.4375 46.6175 40.3208 51.5217 42.1875 56.43C42.3375 56.8175 42.4875 56.905 42.8875 56.7175C47.325 54.6425 51.0375 51.68 53.9 47.7175C58.25 41.6925 60.0375 34.98 59.1875 27.5925C57.475 12.905 44.2625 0.74253 27.25 2.84253C13.9875 4.46753 2.8375 15.655 2.6125 31.0675V31.0675Z"
      fill="#333333"
    />
  </svg>
);

export default OSSIcon;
