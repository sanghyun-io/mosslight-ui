import type { HTMLAttributes } from "react";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
  size?: "sm" | "md" | "lg";
};

export function Spinner({ className = "", label = "Loading", size = "md", ...props }: SpinnerProps) {
  return (
    <span className={`ms-spinner ms-spinner--${size} ${className}`.trim()} role="status" aria-label={label} {...props}>
      <span className="ms-spinner__mark" aria-hidden="true" />
    </span>
  );
}
