import type { HTMLAttributes } from "react";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "moss" | "sky" | "amber" | "plum";
};

export function Badge({ className = "", tone = "moss", ...props }: BadgeProps) {
  return <span className={`ms-badge ms-badge--${tone} ${className}`.trim()} {...props} />;
}
