import type { ReactNode } from "react";
import { useId, useState } from "react";

export type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({ items, defaultValue, value, onValueChange }: TabsProps) {
  const baseId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const selectedValue = value ?? internalValue;
  const selectedItem = items.find((item) => item.value === selectedValue) ?? items[0];

  const selectTab = (nextValue: string) => {
    setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <div className="ms-tabs">
      <div className="ms-tabs__list" role="tablist">
        {items.map((item) => {
          const selected = item.value === selectedItem?.value;

          return (
            <button
              className="ms-tabs__tab"
              id={`${baseId}-${item.value}-tab`}
              key={item.value}
              type="button"
              role="tab"
              aria-controls={`${baseId}-${item.value}-panel`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selectedItem ? (
        <div
          className="ms-tabs__panel"
          id={`${baseId}-${selectedItem.value}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-${selectedItem.value}-tab`}
        >
          {selectedItem.content}
        </div>
      ) : null}
    </div>
  );
}
