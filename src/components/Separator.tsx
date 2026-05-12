import type { HTMLAttributes } from "react";

export type SeparatorProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Separator({ className = "", orientation = "horizontal", decorative = true, ...props }: SeparatorProps) {
  return (
    <hr
      className={`ms-separator ms-separator--${orientation} ${className}`.trim()}
      aria-orientation={orientation}
      role={decorative ? "none" : "separator"}
      {...props}
    />
  );
}
