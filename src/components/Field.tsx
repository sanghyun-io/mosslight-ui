import type { InputHTMLAttributes } from "react";

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Field({ className = "", id, label, hint, error, required, disabled, ...props }: FieldProps) {
  const fieldId = id ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <label className={`ms-field ${className}`.trim()} data-invalid={error ? "" : undefined} htmlFor={fieldId}>
      <span className="ms-field__label">
        <span>{label}</span>
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <input
        id={fieldId}
        className="ms-field__control"
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        required={required}
        {...props}
      />
      {hint ? (
        <span className="ms-field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="ms-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
