import type { HTMLAttributes, ReactNode } from "react";
import { useId } from "react";

export type FormControlProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

export function FormControl({
  className = "",
  label,
  htmlFor,
  hint,
  error,
  required,
  disabled,
  children,
  ...props
}: FormControlProps) {
  const generatedHintId = useId();
  const generatedErrorId = useId();
  const hintId = htmlFor ? `${htmlFor}-hint` : generatedHintId;
  const errorId = htmlFor ? `${htmlFor}-error` : generatedErrorId;

  return (
    <div
      className={`ms-form-control ${className}`.trim()}
      data-disabled={disabled ? "" : undefined}
      data-invalid={error ? "" : undefined}
      {...props}
    >
      <label className="ms-form-control__label" htmlFor={htmlFor}>
        <span>{label}</span>
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      {children}
      {hint ? (
        <p className="ms-form-control__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="ms-form-control__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function getFormDescriptionIds({
  baseId,
  hint,
  error,
}: {
  baseId: string;
  hint?: ReactNode;
  error?: ReactNode;
}) {
  return [hint ? `${baseId}-hint` : null, error ? `${baseId}-error` : null].filter(Boolean).join(" ") || undefined;
}
