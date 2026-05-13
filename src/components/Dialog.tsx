import type { ReactNode, RefObject } from "react";
import { useEffect, useId, useRef } from "react";
import { Button } from "./Button";

export type DialogProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onOpenChange: (open: boolean) => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  closeOnEscape = true,
  closeOnInteractOutside = true,
  initialFocusRef,
  onOpenChange,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(focusableSelector);
      (initialFocusRef?.current ?? firstFocusable ?? panelRef.current)?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1,
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [closeOnEscape, initialFocusRef, onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="ms-dialog" role="presentation">
      <button
        className="ms-dialog__scrim"
        type="button"
        aria-label="Close dialog"
        onClick={() => {
          if (closeOnInteractOutside) {
            onOpenChange(false);
          }
        }}
      />
      <section
        className="ms-dialog__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <header className="ms-dialog__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" aria-label="Close dialog" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </header>
        {children ? <div className="ms-dialog__body">{children}</div> : null}
        {footer ? <footer className="ms-dialog__footer">{footer}</footer> : null}
      </section>
    </div>
  );
}
