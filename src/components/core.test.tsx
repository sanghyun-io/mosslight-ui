import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRef, useState } from "react";
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

  it("changes Tabs panel content with keyboard navigation", () => {
    render(
      <Tabs
        items={[
          { label: "Ready", value: "ready", content: "Ready content" },
          { label: "Calm", value: "calm", content: "Calm content" },
        ]}
      />,
    );

    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Calm content");
  });

  it("traps focus inside Dialog and restores focus after close", async () => {
    function DialogHarness() {
      const [open, setOpen] = useState(false);
      const firstButtonRef = useRef<HTMLButtonElement>(null);

      return (
        <>
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <Dialog open={open} title="Prepare satchel" initialFocusRef={firstButtonRef} onOpenChange={setOpen}>
            <button ref={firstButtonRef}>First action</button>
            <button>Second action</button>
          </Dialog>
        </>
      );
    }

    render(<DialogHarness />);
    const opener = screen.getByRole("button", { name: "Open dialog" });
    opener.focus();
    fireEvent.click(opener);
    await waitFor(() => expect(screen.getByRole("button", { name: "First action" })).toHaveFocus());

    screen.getByRole("button", { name: "Second action" }).focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(screen.getAllByRole("button", { name: "Close dialog" })[1]).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
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
