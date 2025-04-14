import * as React from "react";
const CustomCircle = (props) => (
  <svg
    width={43}
    height={43}
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <foreignObject x={0} y={-10} width={43} height={53}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(5px)",
          clipPath: "url(#bgblur_0_133_630_clip_path)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <g filter="url(#filter0_d_133_630)" data-figma-bg-blur-radius={10}>
      <circle
        cx={21.5}
        cy={11.5}
        r={11.5}
        fill="url(#paint0_linear_133_630)"
        fillOpacity={0.7}
        shapeRendering="crispEdges"
      />
      <circle
        cx={21.5}
        cy={11.5}
        r={11}
        stroke="url(#paint1_linear_133_630)"
        style={{
          mixBlendMode: "overlay",
        }}
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_133_630"
        x={0}
        y={-10}
        width={43}
        height={53}
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
        <feOffset dy={10} />
        <feGaussianBlur stdDeviation={5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_133_630"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_133_630"
          result="shape"
        />
      </filter>
      <clipPath id="bgblur_0_133_630_clip_path" transform="translate(0 10)">
        <circle cx={21.5} cy={11.5} r={11.5} />
      </clipPath>
      <linearGradient
        id="paint0_linear_133_630"
        x1={16.142}
        y1={1.56818}
        x2={25.017}
        y2={23.0047}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.0532409} stopColor="#026DFF" />
        <stop offset={0.826923} stopColor="#00D7FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_133_630"
        x1={21.5}
        y1={0}
        x2={21.5}
        y2={23}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity={0.5} />
        <stop offset={1} stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);
export default CustomCircle;
