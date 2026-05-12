import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("updates range value", () => {
    render(<Slider label="Warmth" defaultValue={20} />);

    const control = screen.getByLabelText("Warmth");
    fireEvent.change(control, { target: { value: "70" } });

    expect(control).toHaveValue("70");
  });
});
