import type { InputHTMLAttributes } from "react";

export type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type RadioGroupProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
};

export function RadioGroup({ className = "", label, name, options, value, defaultValue, ...props }: RadioGroupProps) {
  return (
    <fieldset className={`ms-radio-group ${className}`.trim()}>
      <legend>{label}</legend>
      <div className="ms-radio-group__options">
        {options.map((option) => (
          <label className="ms-radio" key={option.value}>
            <input
              className="ms-radio__input"
              type="radio"
              name={name}
              value={option.value}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={defaultValue === option.value}
              disabled={option.disabled}
              {...props}
            />
            <span className="ms-radio__dot" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
