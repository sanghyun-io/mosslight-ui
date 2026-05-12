import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces loading status", () => {
    render(<Spinner label="Loading map" />);

    expect(screen.getByRole("status", { name: "Loading map" })).toBeInTheDocument();
  });
});
