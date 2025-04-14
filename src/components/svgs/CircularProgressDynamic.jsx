import React from "react";

// Converts polar coordinates to Cartesian for arc drawing
function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

// Returns a pie-slice-shaped path for a circular progress arc
function describeArc(cx, cy, r, progress) {
  const endAngle = progress * 360;
  const start = polarToCartesian(cx, cy, r, 0);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

// 🎯 Your main progress component
const CircularProgressDynamic = ({ progress = 0.5 }) => {
  const clipPathId = "dynamic-progress-clip";
  const pathData = describeArc(168.5, 168.5, 100, progress); // 100 is radius

  return (
    <>
      {/* ClipPath goes inside <defs> */}
      <defs>
        <clipPath id={clipPathId}>
          <path d={pathData} />
        </clipPath>
      </defs>

      {/* Main clipped progress rendering */}
      <g clipPath={`url(#${clipPathId})`}>
        <g transform="matrix(0 0.1015 -0.1025 0 168.5 168.5)">
          <foreignObject
            x={-1009.68}
            y={-1009.68}
            width={2019.36}
            height={2019.36}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                background:
                  "conic-gradient(from 90deg,rgba(43,143,243,0) 0deg,rgba(43,143,243,0) 90deg,rgba(55,244,250,1) 129.808deg,rgba(55,244,250,1) 283.846deg,rgba(43,143,243,0) 353.831deg,rgba(43,143,243,0) 360deg)",
                height: "100%",
                width: "100%",
                opacity: 1,
              }}
            />
          </foreignObject>
        </g>
      </g>
    </>
  );
};

export default CircularProgressDynamic;
