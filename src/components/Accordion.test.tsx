import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
