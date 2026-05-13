import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement, useId, useState } from "react";

export type TooltipProps = {
  content: ReactNode;
  children: ReactElement<HTMLAttributes<HTMLElement>>;
};

function callAll<T>(...handlers: Array<((event: T) => void) | undefined>) {
  return (event: T) => {
    handlers.forEach((handler) => handler?.(event));
  };
}

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
        onBlur: callAll(children.props.onBlur, () => setOpen(false)),
        onFocus: callAll(children.props.onFocus, () => setOpen(true)),
        onKeyDown: callAll(children.props.onKeyDown, (event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }),
        onMouseEnter: callAll(children.props.onMouseEnter, () => setOpen(true)),
        onMouseLeave: callAll(children.props.onMouseLeave, () => setOpen(false)),
      })}
      {open ? (
        <span className="ms-tooltip__content" id={tooltipId} role="tooltip">
          {content}
        </span>
      ) : null}
    </span>
  );
}
