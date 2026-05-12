import type { HTMLAttributes, ReactNode } from "react";

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tone?: "moss" | "sky" | "amber" | "plum";
  action?: ReactNode;
};

export type ToastViewportProps = HTMLAttributes<HTMLDivElement>;

export function Toast({ className = "", title, tone = "moss", action, children, ...props }: ToastProps) {
  return (
    <div className={`ms-toast ms-toast--${tone} ${className}`.trim()} role="status" {...props}>
      <div className="ms-toast__content">
        <strong>{title}</strong>
        {children ? <p>{children}</p> : null}
      </div>
      {action ? <div className="ms-toast__action">{action}</div> : null}
    </div>
  );
}

export function ToastViewport({ className = "", ...props }: ToastViewportProps) {
  return <div className={`ms-toast-viewport ${className}`.trim()} {...props} />;
}
