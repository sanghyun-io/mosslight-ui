import type { ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement, useId, useState } from "react";

export type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
};

export function Tooltip({ content, children }: TooltipProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  if (!isValidElement(children)) {
    return null;
  }

  return (
    <span className="ms-tooltip">
      {cloneElement(children, {
        "aria-describedby": open ? tooltipId : undefined,
        onBlur: () => setOpen(false),
        onFocus: () => setOpen(true),
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      })}
      {open ? (
        <span className="ms-tooltip__content" id={tooltipId} role="tooltip">
          {content}
        </span>
      ) : null}
    </span>
  );
}
