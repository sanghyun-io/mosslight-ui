import type { SelectHTMLAttributes } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  options: SelectOption[];
};

export function Select({ className = "", id, label, hint, options, ...props }: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className={`ms-field ms-select ${className}`.trim()} htmlFor={selectId}>
      <span className="ms-field__label">{label}</span>
      <span className="ms-select__wrap">
        <select id={selectId} className="ms-field__control ms-select__control" {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
      {hint ? <span className="ms-field__hint">{hint}</span> : null}
    </label>
  );
}
