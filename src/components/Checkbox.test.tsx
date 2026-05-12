import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles checked state through the label", () => {
    render(<Checkbox label="Pack lantern" />);

    const control = screen.getByLabelText("Pack lantern");
    fireEvent.click(control);

    expect(control).toBeChecked();
  });
});
