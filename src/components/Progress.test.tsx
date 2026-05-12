import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("exposes bounded progressbar values", () => {
    render(<Progress label="Map copied" value={140} max={120} />);

    const progress = screen.getByRole("progressbar", { name: "Map copied" });
    expect(progress).toHaveAttribute("aria-valuenow", "120");
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
