import * as React from "react";
const DecreaseButton = (props) => (
  <svg
    width={90}
    height={120}
    viewBox="0 0 90 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <foreignObject x={-9.98853} y={-9.08081} width={102.006} height={138.266}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(5px)",
          clipPath: "url(#bgblur_0_21_499_clip_path)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <g data-figma-bg-blur-radius={10}>
      <path
        d="M77.7611 54.5118C83.5943 58.6009 83.3965 67.3 77.3892 71.1287L2.23473 119.027C1.57127 119.45 0.701927 118.976 0.697289 118.19L0.0114212 1.93615C0.00662994 1.12413 0.904594 0.634135 1.56952 1.10025C7.63267 5.35062 29.9361 20.9857 45 31.5457C55.0207 38.5703 68.2449 47.8407 77.7611 54.5118Z"
        fill="url(#paint0_linear_21_499)"
        fillOpacity={0.1}
      />
      <path
        d="M77.4741 54.9212C83.0152 58.8055 82.828 67.0695 77.1205 70.707L1.966 118.605C1.63427 118.817 1.1996 118.58 1.19728 118.187L0.511414 1.9332C0.508911 1.50917 0.964714 1.28689 1.28251 1.50968L44.713 31.9551L77.4741 54.9212Z"
        stroke="url(#paint1_linear_21_499)"
        strokeOpacity={0.6}
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </g>
    <path
      d="M23 64H41"
      stroke="white"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <clipPath
        id="bgblur_0_21_499_clip_path"
        transform="translate(9.98853 9.08081)"
      >
        <path d="M77.7611 54.5118C83.5943 58.6009 83.3965 67.3 77.3892 71.1287L2.23473 119.027C1.57127 119.45 0.701927 118.976 0.697289 118.19L0.0114212 1.93615C0.00662994 1.12413 0.904594 0.634135 1.56952 1.10025C7.63267 5.35062 29.9361 20.9857 45 31.5457C55.0207 38.5703 68.2449 47.8407 77.7611 54.5118Z" />
      </clipPath>
      <linearGradient
        id="paint0_linear_21_499"
        x1={3}
        y1={76}
        x2={117.001}
        y2={74.0323}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity={0} />
        <stop offset={1} stopColor="white" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_21_499"
        x1={3.61116}
        y1={66.4224}
        x2={111.031}
        y2={67.3576}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity={0} />
        <stop offset={1} stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);
export default DecreaseButton;
