import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Badge, Button, Card, Dialog, Field, Select, Switch, Tabs, Toast, ToastViewport } from "../index";

describe("core components", () => {
  it("renders Badge, Button, and Card primitives", () => {
    const onClick = vi.fn();

    render(
      <Card>
        <Badge>Ready</Badge>
        <Button onClick={onClick}>Accept</Button>
      </Card>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("connects Field labels and values", () => {
    render(<Field label="Traveler" defaultValue="Fern" />);

    expect(screen.getByLabelText("Traveler")).toHaveValue("Fern");
  });

  it("renders Select options", () => {
    render(
      <Select
        label="Region"
        defaultValue="woods"
        options={[
          { label: "Lake village", value: "lake" },
          { label: "Old woods", value: "woods" },
        ]}
      />,
    );

    expect(screen.getByLabelText("Region")).toHaveValue("woods");
  });

  it("toggles Switch checked state", () => {
    render(<Switch label="Campfire mode" />);

    const control = screen.getByLabelText("Campfire mode");
    fireEvent.click(control);

    expect(control).toBeChecked();
  });

  it("changes Tabs panel content", () => {
    render(
      <Tabs
        items={[
          { label: "Ready", value: "ready", content: "Ready content" },
          { label: "Calm", value: "calm", content: "Calm content" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Calm" }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Calm content");
  });

  it("closes Dialog through the close button", () => {
    function DialogHarness() {
      const [open, setOpen] = useState(true);
      return <Dialog open={open} title="Prepare satchel" onOpenChange={setOpen}>Dialog body</Dialog>;
    }

    render(<DialogHarness />);
    fireEvent.click(screen.getAllByRole("button", { name: "Close dialog" })[1]);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders Toast inside a viewport", () => {
    render(
      <ToastViewport>
        <Toast title="Journey saved">Quiet feedback.</Toast>
      </ToastViewport>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("Journey saved");
  });
});
