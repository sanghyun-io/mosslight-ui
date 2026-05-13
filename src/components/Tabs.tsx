import type { KeyboardEvent, ReactNode } from "react";
import { useId, useRef } from "react";
import { useControllableState } from "../utils/useControllableState";

export type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  activationMode?: "automatic" | "manual";
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({
  items,
  activationMode = "automatic",
  defaultValue,
  orientation = "horizontal",
  value,
  onValueChange,
}: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? items[0]?.value ?? "",
    onChange: onValueChange,
  });
  const selectedItem = items.find((item) => item.value === selectedValue) ?? items[0];

  const selectTab = (nextValue: string) => {
    setSelectedValue(nextValue);
  };

  const moveFocus = (nextIndex: number, shouldSelect: boolean) => {
    const normalizedIndex = (nextIndex + items.length) % items.length;
    tabRefs.current[normalizedIndex]?.focus();
    if (shouldSelect) {
      selectTab(items[normalizedIndex].value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = items.findIndex((item) => item.value === selectedItem?.value);
    const shouldSelect = activationMode === "automatic";
    const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";

    if (event.key === previousKey) {
      event.preventDefault();
      moveFocus(currentIndex - 1, shouldSelect);
    } else if (event.key === nextKey) {
      event.preventDefault();
      moveFocus(currentIndex + 1, shouldSelect);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0, shouldSelect);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(items.length - 1, shouldSelect);
    } else if (activationMode === "manual" && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      const activeIndex = tabRefs.current.findIndex((element) => element === document.activeElement);
      if (activeIndex >= 0) {
        selectTab(items[activeIndex].value);
      }
    }
  };

  return (
    <div className="ms-tabs">
      <div className="ms-tabs__list" role="tablist" aria-orientation={orientation} onKeyDown={handleKeyDown}>
        {items.map((item, index) => {
          const selected = item.value === selectedItem?.value;

          return (
            <button
              className="ms-tabs__tab"
              id={`${baseId}-${item.value}-tab`}
              key={item.value}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
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
