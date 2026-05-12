import type { HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "text" | "block" | "circle";
};

export function Skeleton({ className = "", variant = "block", ...props }: SkeletonProps) {
  return <div className={`ms-skeleton ms-skeleton--${variant} ${className}`.trim()} aria-busy="true" {...props} />;
}
