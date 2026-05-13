import type { KeyboardEvent, ReactNode } from "react";
import { useId, useRef } from "react";
import { useControllableState } from "../utils/useControllableState";

export type AccordionItem = {
  title: string;
  value: string;
  content: ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Accordion({ items, collapsible = true, defaultValue, value, onValueChange }: AccordionProps) {
  const baseId = useId();
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [openValue, setOpenValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? items[0]?.value ?? "",
    onChange: onValueChange,
  });

  const moveFocus = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + items.length) % items.length;
    triggerRefs.current[normalizedIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const activeIndex = triggerRefs.current.findIndex((element) => element === document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(items.length - 1);
    }
  };

  return (
    <div className="ms-accordion" onKeyDown={handleKeyDown}>
      {items.map((item, index) => {
        const open = item.value === openValue;
        const panelId = `${baseId}-${item.value}-panel`;

        return (
          <section className="ms-accordion__item" key={item.value}>
            <button
              className="ms-accordion__trigger"
              type="button"
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => {
                if (open && !collapsible) {
                  return;
                }
                setOpenValue(open ? "" : item.value);
              }}
            >
              <span>{item.title}</span>
              <span className="ms-accordion__chevron" aria-hidden="true" />
            </button>
            {open ? (
              <div className="ms-accordion__panel" id={panelId}>
                {item.content}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
