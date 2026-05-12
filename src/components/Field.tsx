import type { InputHTMLAttributes } from "react";

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Field({ className = "", id, label, hint, ...props }: FieldProps) {
  const fieldId = id ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className={`ms-field ${className}`.trim()} htmlFor={fieldId}>
      <span className="ms-field__label">{label}</span>
      <input id={fieldId} className="ms-field__control" {...props} />
      {hint ? <span className="ms-field__hint">{hint}</span> : null}
    </label>
  );
}
