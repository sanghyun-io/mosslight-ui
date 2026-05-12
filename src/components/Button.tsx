import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`ms-button ms-button--${variant} ms-button--${size} ${className}`.trim()}
      {...props}
    >
      {icon ? <span className="ms-button__icon">{icon}</span> : null}
      {children ? <span className="ms-button__label">{children}</span> : null}
    </button>
  );
}
