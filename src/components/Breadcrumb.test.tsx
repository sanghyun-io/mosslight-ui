import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders links and marks the current page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Library", href: "/library" },
          { label: "Components", href: "/components" },
          { label: "Breadcrumb" },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Library" })).toHaveAttribute("href", "/library");
    expect(screen.getByText("Breadcrumb")).toHaveAttribute("aria-current", "page");
  });
});
