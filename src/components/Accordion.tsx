import type { ReactNode } from "react";
import { useId, useState } from "react";

export type AccordionItem = {
  title: string;
  value: string;
  content: ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  defaultValue?: string;
};

export function Accordion({ items, defaultValue }: AccordionProps) {
  const baseId = useId();
  const [openValue, setOpenValue] = useState(defaultValue ?? items[0]?.value);

  return (
    <div className="ms-accordion">
      {items.map((item) => {
        const open = item.value === openValue;
        const panelId = `${baseId}-${item.value}-panel`;

        return (
          <section className="ms-accordion__item" key={item.value}>
            <button
              className="ms-accordion__trigger"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenValue(open ? "" : item.value)}
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
