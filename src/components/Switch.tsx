import type { InputHTMLAttributes } from "react";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function Switch({ className = "", id, label, ...props }: SwitchProps) {
  const switchId = id ?? `switch-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label className={`ms-switch ${className}`.trim()} htmlFor={switchId}>
      <input id={switchId} className="ms-switch__input" type="checkbox" {...props} />
      <span className="ms-switch__track" aria-hidden="true">
        <span className="ms-switch__thumb" />
      </span>
      <span className="ms-switch__label">{label}</span>
    </label>
  );
}
