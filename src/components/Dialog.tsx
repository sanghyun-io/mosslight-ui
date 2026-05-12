import type { ReactNode } from "react";
import { useEffect } from "react";
import { Button } from "./Button";

export type DialogProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onOpenChange: (open: boolean) => void;
};

export function Dialog({ open, title, description, children, footer, onOpenChange }: DialogProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="ms-dialog" role="presentation">
      <button
        className="ms-dialog__scrim"
        type="button"
        aria-label="Close dialog"
        onClick={() => onOpenChange(false)}
      />
      <section className="ms-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="ms-dialog-title">
        <header className="ms-dialog__header">
          <div>
            <h2 id="ms-dialog-title">{title}</h2>
            {description ? <p>{description}</p> : null}
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
