import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("marks loading placeholders as busy", () => {
    render(<Skeleton aria-label="Loading route card" />);

    expect(screen.getByLabelText("Loading route card")).toHaveAttribute("aria-busy", "true");
  });
});
