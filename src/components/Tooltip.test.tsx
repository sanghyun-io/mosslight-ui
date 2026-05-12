import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("opens on focus and closes on blur", () => {
    render(
      <Tooltip content="Save route">
        <Button>Save</Button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Save route");

    fireEvent.blur(screen.getByRole("button", { name: "Save" }));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
