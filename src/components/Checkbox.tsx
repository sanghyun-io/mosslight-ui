import type { InputHTMLAttributes } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  hint?: string;
};

export function Checkbox({ className = "", id, label, hint, ...props }: CheckboxProps) {
  const checkboxId = id ?? `checkbox-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className={`ms-checkbox ${className}`.trim()} htmlFor={checkboxId}>
      <input id={checkboxId} className="ms-checkbox__input" type="checkbox" {...props} />
      <span className="ms-checkbox__box" aria-hidden="true" />
      <span className="ms-checkbox__text">
        <span className="ms-checkbox__label">{label}</span>
        {hint ? <span className="ms-checkbox__hint">{hint}</span> : null}
      </span>
    </label>
  );
}
