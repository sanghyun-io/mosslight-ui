import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("switches visible panel content", () => {
    render(
      <Accordion
        items={[
          { title: "Morning", value: "morning", content: "Pack herbs" },
          { title: "Evening", value: "evening", content: "Light campfire" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Evening" }));

    expect(screen.getByText("Light campfire")).toBeInTheDocument();
    expect(screen.queryByText("Pack herbs")).not.toBeInTheDocument();
  });

  it("supports controlled value changes", () => {
    const onValueChange = vi.fn();

    render(
      <Accordion
        value="morning"
        onValueChange={onValueChange}
        items={[
          { title: "Morning", value: "morning", content: "Pack herbs" },
          { title: "Evening", value: "evening", content: "Light campfire" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Evening" }));

    expect(onValueChange).toHaveBeenCalledWith("evening");
    expect(screen.getByText("Pack herbs")).toBeInTheDocument();
  });

  it("moves trigger focus with arrow keys", () => {
    render(
      <Accordion
        items={[
          { title: "Morning", value: "morning", content: "Pack herbs" },
          { title: "Evening", value: "evening", content: "Light campfire" },
        ]}
      />,
    );

    screen.getByRole("button", { name: "Morning" }).focus();
    fireEvent.keyDown(screen.getByRole("button", { name: "Morning" }), { key: "ArrowDown" });

    expect(screen.getByRole("button", { name: "Evening" })).toHaveFocus();
  });
});
