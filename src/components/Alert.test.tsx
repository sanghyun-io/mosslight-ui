import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("uses status for non-danger messages", () => {
    render(<Alert title="Path updated">The bridge route is open.</Alert>);

    expect(screen.getByRole("status")).toHaveTextContent("Path updated");
  });

  it("uses alert for danger tone", () => {
    render(<Alert title="Storm warning" tone="danger">Shelter before dusk.</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent("Storm warning");
  });
});
