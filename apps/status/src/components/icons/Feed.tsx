import type { JSX } from 'preact';

type Props = JSX.SVGAttributes<SVGSVGElement>;

export const FeedIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5 21q-.825 0-1.412-.587T3 19q0-.825.588-1.412T5 17q.825 0 1.413.588T7 19q0 .825-.587 1.413T5 21m12 0q0-2.925-1.1-5.462t-3-4.438q-1.9-1.9-4.437-3T3 7V4q3.55 0 6.625 1.325t5.4 3.65q2.325 2.325 3.65 5.4T20 21zm-6 0q0-1.675-.625-3.113T8.65 15.35q-1.1-1.1-2.537-1.725T3 13v-3q2.3 0 4.288.863t3.487 2.362q1.5 1.5 2.363 3.488T14 21z"
    ></path>
  </svg>
);
