import * as React from "react";
const PlusIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 12H4" stroke="#B6BCDF" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M20 12H4"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path d="M12 4V20" stroke="#B6BCDF" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M12 4V20"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
export default PlusIcon;
