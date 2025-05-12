import React, { useEffect, useRef, useState } from "react";
import CustomCircle from "../shared/CustomCircle";

// Utility: Round to nearest 10%
const getPercentage = (progress) => {
  const clamped = Math.max(0, Math.min(progress, 1));
  return Math.round(clamped * 10) * 10; // → 0, 10, 20, ..., 100
};

const getCirclePosition = (percentage) => {
  switch (percentage) {
    case 0:
      return { x: 72, y: 170 };
    case 6:
      return { x: 75, y: 150 };
    case 10:
      return { x: 77, y: 142 };
    case 13:
      return { x: 80, y: 132 };
    case 20:
      return { x: 88, y: 113 };
    case 26:
      return { x: 102, y: 98 };
    case 30:
      return { x: 107, y: 92 };
    case 33:
      return { x: 118, y: 85 };
    case 40:
      return { x: 135, y: 78 };
    case 46:
      return { x: 158, y: 75 };
    case 50:
      return { x: 164, y: 73 };
    case 53:
      return { x: 178, y: 75 };
    case 60:
      return { x: 200, y: 80 };
    case 66:
      return { x: 216, y: 87 };
    case 70:
      return { x: 221, y: 90 };
    case 73:
      return { x: 235, y: 102 };
    case 80:
      return { x: 245, y: 115 };
    case 86:
      return { x: 254, y: 132 };
    case 90:
      return { x: 258, y: 140 };
    case 93:
      return { x: 260, y: 150 };
    case 100:
      return { x: 263, y: 170 };
    default:
      return { x: 75, y: 265 };
  }
};

const getClosestProgress = (x, y) => {
  let closest = null;
  let minDistance = Infinity;
  const percentages = [0, 6, 13, 20, 26, 33, 40, 46, 53, 60, 66, 73, 80, 86, 93, 100];

  for (let p of percentages) {
    const { x: px, y: py } = getCirclePosition(p);
    const offsetX = px - 21.5;
    const offsetY = py - 11.5;

    const dx = Math.abs(x - offsetX);
    const dy = Math.abs(y - offsetY);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      closest = p;
    }
  }

  return closest;
};

const CircularProgress = ({ min, max, onChange, currentProgress = 0 }) => {
  const [progress, setProgress] = useState();
  const [clipPathId, setClipPathId] = useState();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setProgress(currentProgress);
  }, [currentProgress]);

  useEffect(() => {
    const percentage = parseInt(progress * 100);
    setClipPathId(`paint16_angular_0_${percentage || 0}_clip_path`);

    const { x, y } = getCirclePosition(percentage || 0);
    const offsetX = x - 21.5;
    const offsetY = y - 11.5;
    setOffset({ x: offsetX, y: offsetY });
  }, [progress]);

  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    dragStart.current = {
      x: clientX - offset.x,
      y: clientY - offset.y,
    };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      // Prevent scrolling
      if (e.cancelable) {
        e.preventDefault();
      }

      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;

      const newX = clientX - dragStart.current.x;
      const newY = clientY - dragStart.current.y;

      const snappedProgress = getClosestProgress(newX, newY);
      setProgress(snappedProgress / 100);
      const range = max - min;
      onChange(Math.ceil((snappedProgress / 100) * range + min));
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <>
      <g clipPath={`url(#${clipPathId || "paint16_angular_0_0_clip_path"})`}>
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
      <g
        transform={`translate(${offset.x}, ${offset.y})`}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{ cursor: "grab" }}
      >
        <CustomCircle />
      </g>
    </>
  );
};

export default CircularProgress;
