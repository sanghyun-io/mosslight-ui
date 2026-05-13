import { useState } from "react";

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const setValue = (nextValue: T) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
}
