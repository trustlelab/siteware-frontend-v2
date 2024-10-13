import React from 'react';

type SliderInputProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  helperText?: string; // Optional helper text below the slider
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
  return (
    <div className="mb-4">
      <label className="config_label">{label}</label>
      <input
        type="range"
        className="w-full range-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
      <p className="config_helper_text">{value}</p>
      {helperText && <p className="config_helper_text">{helperText}</p>}
    </div>
  );
};

export default SliderInput;
