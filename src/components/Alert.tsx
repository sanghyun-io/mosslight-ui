import type { HTMLAttributes, ReactNode } from "react";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tone?: "moss" | "sky" | "amber" | "plum" | "danger";
  icon?: ReactNode;
};

export function Alert({ className = "", title, tone = "moss", icon, children, ...props }: AlertProps) {
  const role = tone === "danger" ? "alert" : "status";

  return (
    <div className={`ms-alert ms-alert--${tone} ${className}`.trim()} role={role} {...props}>
      {icon ? <span className="ms-alert__icon">{icon}</span> : null}
      <div className="ms-alert__content">
        <strong>{title}</strong>
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}
