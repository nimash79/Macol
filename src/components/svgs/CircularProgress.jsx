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

const getClosestProgress = (x, y) => {
  let closest = null;
  let minDistance = Infinity;

  for (let p = 0; p <= 100; p += 10) {
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
  }, [currentProgress])

  useEffect(() => {
    const percentage = getPercentage(progress);
    setClipPathId(`paint16_angular_0_${percentage}_clip_path`);

    const { x, y } = getCirclePosition(percentage);
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
      onChange((snappedProgress / 100) * range + min);
    };
  
    const handleEnd = () => {
      setIsDragging(false);
    };
  
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
  
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

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
