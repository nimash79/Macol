import * as React from "react";
const DeviceDevider = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={177}
    height={1}
    fill="none"
    {...props}
  >
    <rect
      width={177}
      height={1}
      fill="url(#a)"
      rx={0.5}
      style={{
        mixBlendMode: "overlay",
      }}
    />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 .5 -88.5 0 88.5 .5)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);
export default DeviceDevider;
