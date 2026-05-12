import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Badge, Button, Card, Dialog, Field, Select, Switch, Tabs, Toast, ToastViewport } from "../index";

const meta = {
  title: "Mosslight/System",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Foundations: Story = {
  render: () => (
    <div className="story-grid">
      {[
        ["Parchment", "var(--ms-color-parchment)"],
        ["Moss", "var(--ms-color-moss-500)"],
        ["Sky", "var(--ms-color-sky-400)"],
        ["Plum", "var(--ms-color-plum-500)"],
        ["Amber", "var(--ms-color-amber-400)"],
        ["Ink", "var(--ms-color-ink-800)"],
      ].map(([name, color]) => (
        <div className="story-swatch" key={name}>
          <span style={{ background: color }} />
          <strong>{name}</strong>
        </div>
      ))}
    </div>
  ),
};

export const Components: Story = {
  render: () => (
    <div className="story-canvas">
      <Card>
        <Badge>Actions</Badge>
        <Button>Primary action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </Card>
      <Card accent="sky">
        <Badge tone="sky">Inputs</Badge>
        <Field label="Traveler" placeholder="Fern" hint="Use concise helper text." />
        <Select
          label="Region"
          defaultValue="woods"
          options={[
            { label: "North ridge", value: "north" },
            { label: "Lake village", value: "lake" },
            { label: "Old woods", value: "woods" },
          ]}
        />
        <Switch label="Campfire mode" defaultChecked />
      </Card>
      <Card accent="plum">
        <Badge tone="plum">Navigation</Badge>
        <Tabs
          items={[
            { label: "Ready", value: "ready", content: "Stable states use moss and warm neutrals." },
            { label: "Calm", value: "calm", content: "Supportive states use low-saturation sky." },
          ]}
        />
      </Card>
    </div>
  ),
};

export const Feedback: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="story-canvas story-canvas--single">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          title="Prepare satchel"
          description="A modal surface for focused decisions."
          onOpenChange={setOpen}
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          Dialog content keeps the same inked border, parchment surface, and soft atmospheric contrast.
        </Dialog>
        <ToastViewport>
          <Toast title="Journey saved" tone="moss">
            Quiet feedback for completed actions.
          </Toast>
          <Toast title="Weather changed" tone="sky">
            Secondary context without alarming the user.
          </Toast>
        </ToastViewport>
      </div>
    );
  },
};
