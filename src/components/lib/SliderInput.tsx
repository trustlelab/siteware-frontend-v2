import React, { useState, useEffect, useRef } from 'react';

type SliderInputProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  helperText?: string;
};

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  helperText,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate percentage for the initial position of the slider
  const percentage = ((value - min) / (max - min)) * 100;

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDrag(e.pageX); // Initial drag start
  };

  const handleDrag = (pageX: number) => {
    if (sliderRef.current) {
      const sliderBounds = sliderRef.current.getBoundingClientRect();
      const offsetX = Math.min(Math.max(0, pageX - sliderBounds.left), sliderBounds.width);
      const newValue = Math.round(((offsetX / sliderBounds.width) * (max - min) + min) / step) * step;
      onChange(newValue); // Update value as you drag
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDrag(e.pageX);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopDragging);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging]);

  return (
    <div className="mb-4">
      <label className="config_label">{label}</label>
      <div
        className="w-[259px] h-6 relative cursor-pointer"
        ref={sliderRef}
        onMouseDown={(e) => startDragging(e)}
      >
        <div className="w-full h-2 absolute top-[8px] bg-[#eaecf0] dark:bg-gray-700 rounded" />
        <div
          className="h-2 absolute top-[8px] bg-[#7e56d8] rounded"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="w-6 h-6 absolute top-0 bg-white dark:bg-gray-800 rounded-xl shadow border border-[#7e56d8]"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
      <p className="config_helper_text">{value}</p>
      {helperText && <p className="config_helper_text">{helperText}</p>}
    </div>
  );
};

export default SliderInput;
