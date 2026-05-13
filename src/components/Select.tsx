import type { SelectHTMLAttributes } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
};

export function Select({ className = "", id, label, hint, error, options, required, disabled, ...props }: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <label className={`ms-field ms-select ${className}`.trim()} data-invalid={error ? "" : undefined} htmlFor={selectId}>
      <span className="ms-field__label">
        <span>{label}</span>
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
      <span className="ms-select__wrap">
        <select
          id={selectId}
          className="ms-field__control ms-select__control"
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          required={required}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
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
