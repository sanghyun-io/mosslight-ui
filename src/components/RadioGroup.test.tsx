import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
  it("selects an option by label", () => {
    render(
      <RadioGroup
        label="Route"
        name="route"
        options={[
          { label: "North ridge", value: "north" },
          { label: "Lake village", value: "lake" },
        ]}
      />,
    );

    fireEvent.click(screen.getByLabelText("Lake village"));

    expect(screen.getByLabelText("Lake village")).toBeChecked();
  });
});
