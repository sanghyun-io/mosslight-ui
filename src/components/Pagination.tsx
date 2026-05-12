import type { HTMLAttributes } from "react";
import { Button } from "./Button";

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ className = "", page, totalPages, onPageChange, ...props }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={`ms-pagination ${className}`.trim()} aria-label="Pagination" {...props}>
      <Button size="sm" variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <div className="ms-pagination__pages">
        {pages.map((item) => (
          <button
            className="ms-pagination__page"
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <Button size="sm" variant="ghost" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </nav>
  );
}
