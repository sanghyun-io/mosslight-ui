import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";
import { FormControl } from "./FormControl";
import { Select } from "./Select";

describe("form state patterns", () => {
  it("connects Field error text to aria-invalid state", () => {
    render(<Field label="Traveler" error="Traveler is required" required />);

    const field = screen.getByRole("textbox", { name: /Traveler/ });
    expect(field).toBeInvalid();
    expect(field).toBeRequired();
    expect(field).toHaveAccessibleDescription("Traveler is required");
  });

  it("connects Select hint and error descriptions", () => {
    render(
      <Select
        label="Region"
        hint="Choose one"
        error="Region is required"
        options={[{ label: "North ridge", value: "north" }]}
      />,
    );

    expect(screen.getByRole("combobox", { name: /Region/ })).toHaveAccessibleDescription(
      "Choose one Region is required",
    );
  });

  it("renders FormControl metadata for custom controls", () => {
    render(
      <FormControl label="Custom field" htmlFor="custom" error="Invalid choice" required>
        <input id="custom" aria-invalid="true" aria-describedby="custom-error" />
      </FormControl>,
    );

    expect(screen.getByText("Invalid choice")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Custom field/ })).toHaveAccessibleDescription("Invalid choice");
  });
});
