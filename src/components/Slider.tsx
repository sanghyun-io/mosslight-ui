import type { InputHTMLAttributes } from "react";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  output?: string;
};

export function Slider({ className = "", id, label, output, min = 0, max = 100, ...props }: SliderProps) {
  const sliderId = id ?? `slider-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className={`ms-slider ${className}`.trim()} htmlFor={sliderId}>
      <span className="ms-slider__header">
        <span>{label}</span>
        {output ? <strong>{output}</strong> : null}
      </span>
      <input id={sliderId} className="ms-slider__control" type="range" min={min} max={max} {...props} />
    </label>
  );
}
