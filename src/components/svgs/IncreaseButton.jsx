import * as React from "react";
const IncreaseButton = (props) => (
  <svg
    width={90}
    height={120}
    viewBox="0 0 90 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <foreignObject x={-2.01782} y={-9.1853} width={102.006} height={138.266}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          // backdropFilter: "blur(5px)",
          // clipPath: "url(#bgblur_0_21_503_clip_path)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <g data-figma-bg-blur-radius={10}>
      <path
        d="M12.2389 65.4882C6.40568 61.3991 6.60346 52.7 12.6108 48.8713L87.7653 0.973053C88.4287 0.550209 89.2981 1.02371 89.3027 1.81044L89.9886 118.064C89.9934 118.876 89.0954 119.366 88.4305 118.9C82.3673 114.649 60.0639 99.0143 45 88.4543C34.9793 81.4297 21.7551 72.1593 12.2389 65.4882Z"
        fill="url(#paint0_linear_21_503)"
        fillOpacity={0.1}
      />
      <path
        d="M12.5259 65.0788C6.98485 61.1945 7.17205 52.9305 12.8795 49.293L88.034 1.3947C88.3657 1.18327 88.8004 1.42003 88.8027 1.81339L89.4886 118.067C89.4911 118.491 89.0353 118.713 88.7175 118.49L45.287 88.0449L12.5259 65.0788Z"
        stroke="url(#paint1_linear_21_503)"
        strokeOpacity={0.6}
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </g>
    <path
      d="M58 65L58 47"
      stroke="white"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M67 56L49 56"
      stroke="white"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <clipPath
        id="bgblur_0_21_503_clip_path"
        transform="translate(2.01782 9.1853)"
      >
        <path d="M12.2389 65.4882C6.40568 61.3991 6.60346 52.7 12.6108 48.8713L87.7653 0.973053C88.4287 0.550209 89.2981 1.02371 89.3027 1.81044L89.9886 118.064C89.9934 118.876 89.0954 119.366 88.4305 118.9C82.3673 114.649 60.0639 99.0143 45 88.4543C34.9793 81.4297 21.7551 72.1593 12.2389 65.4882Z" />
      </clipPath>
      <linearGradient
        id="paint0_linear_21_503"
        x1={90.2598}
        y1={53.0769}
        x2={-51.002}
        y2={59.96}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity={0} />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_21_503"
        x1={86.3888}
        y1={53.5776}
        x2={-21.0311}
        y2={52.6424}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity={0} />
        <stop offset={1} stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);
export default IncreaseButton;
