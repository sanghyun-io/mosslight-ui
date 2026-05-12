import type { HTMLAttributes } from "react";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
  label?: string;
};

export function Progress({ className = "", value, max = 100, label, ...props }: ProgressProps) {
  const boundedValue = Math.min(Math.max(value, 0), max);
  const percent = max > 0 ? Math.round((boundedValue / max) * 100) : 0;

  return (
    <div className={`ms-progress ${className}`.trim()} {...props}>
      {label ? (
        <div className="ms-progress__header">
          <span>{label}</span>
          <strong>{percent}%</strong>
        </div>
      ) : null}
      <div
        className="ms-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={boundedValue}
        aria-label={label}
      >
        <span className="ms-progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
