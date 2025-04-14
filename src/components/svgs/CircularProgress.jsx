import React from "react";
import CustomCircle from "../shared/CustomCircle";

// Utility: Round to nearest 10%
const getPercentage = (progress) => {
  const clamped = Math.max(0, Math.min(progress, 1));
  return Math.round(clamped * 10) * 10; // → 0, 10, 20, ..., 100
};

const getCirclePosition = (percentage) => {
  switch (percentage) {
    case 0:
      return { x: 75, y: 170 };
    case 10:
      return { x: 77, y: 142 };
    case 20:
      return { x: 88, y: 113 };
    case 30:
      return { x: 107, y: 92 };
    case 40:
      return { x: 135, y: 78 };
    case 50:
      return { x: 164, y: 73 };
    case 60:
      return { x: 193, y: 78 };
    case 70:
      return { x: 221, y: 90 };
    case 80:
      return { x: 244, y: 112 };
    case 90:
      return { x: 258, y: 140 };
    case 100:
      return { x: 263, y: 170 };
    default:
      return { x: 75, y: 265 };
  }
};

const CircularProgress = ({ progress = 0 }) => {
  const percentage = getPercentage(progress);
  const clipPathId = `paint16_angular_0_${percentage}_clip_path`;

  const { x, y } = getCirclePosition(percentage);
  const offsetX = x - 21.5;
  const offsetY = y - 11.5;

  return (
    <>
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
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        <CustomCircle />
      </g>
    </>
  );
};

export default CircularProgress;
