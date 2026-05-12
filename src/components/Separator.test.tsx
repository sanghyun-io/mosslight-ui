import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("can be exposed as an accessible separator", () => {
    render(<Separator decorative={false} orientation="vertical" />);

    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });
});
