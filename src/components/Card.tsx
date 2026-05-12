import type { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  accent?: "moss" | "sky" | "amber" | "plum";
};

export function Card({ className = "", accent = "moss", ...props }: CardProps) {
  return <article className={`ms-card ms-card--${accent} ${className}`.trim()} {...props} />;
}
