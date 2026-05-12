import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no image is provided", () => {
    render(<Avatar name="Fern Vale" />);

    expect(screen.getByText("FV")).toBeInTheDocument();
  });

  it("falls back to initials when the image fails", () => {
    render(<Avatar name="Stark" src="/missing.png" />);

    fireEvent.error(screen.getByRole("img", { name: "Stark" }));

    expect(screen.getByText("S")).toBeInTheDocument();
  });
});
