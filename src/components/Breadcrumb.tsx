import type { AnchorHTMLAttributes, ReactNode } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
};

export function Breadcrumb({ items, separator = "/", linkProps }: BreadcrumbProps) {
  return (
    <nav className="ms-breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const current = item.current || index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`}>
              {item.href && !current ? (
                <a href={item.href} {...linkProps}>
                  {item.label}
                </a>
              ) : (
                <span aria-current={current ? "page" : undefined}>{item.label}</span>
              )}
              {index < items.length - 1 ? <span className="ms-breadcrumb__separator">{separator}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
